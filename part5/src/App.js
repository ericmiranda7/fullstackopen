import React, { useState, useEffect, useRef } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import LoginForm from './components/LoginForm'
import loginService from './services/login'
import BlogForm from './components/BlogForm'
import Notification from './components/Notification'
import Togglable from './components/Togglable'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [message, setMessage] = useState({})

  const blogFormRef = useRef()

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs(blogs)
    )
  }, [])

  useEffect(() => {
    const user = window.localStorage.getItem('user')
    setUser(JSON.parse(user))
  }, [])

  const handleLogin = async (event) => {
    event.preventDefault()

    try {
      const user = await loginService.login({ username, password })

      window.localStorage.setItem('user', JSON.stringify(user))
      setUser(user)
      setUsername('')
      setPassword('')
    } catch {
      setMessage({
        text: 'Username or password invalid',
        type: 'error'
      })
      setTimeout(() => setMessage(null), 5000)
    }
  }

  const handleLogout = () => {
    window.localStorage.removeItem('user')
    setUser(null)
  }

  const createBlog = async blog => {
    blogFormRef.current.toggleVisibility()

    const token = user.token

    await blogService.postBlog(blog, token)
    setBlogs(await blogService.getAll())
    setMessage({
      text: 'Blog created successfully',
      type: 'success'
    })
    setTimeout(() => setMessage(null), 5000)
  }

  if (user === null) {
    return (
      <div>
        <Notification
          message={message}
        />

        <LoginForm
          handleLogin={handleLogin}
          username={username}
          setUsername={setUsername}
          password={password}
          setPassword={setPassword}
        />
      </div>
    )
  }

  const incrLikes = async (blog) => {
    await blogService.updateBlog(blog)
    setBlogs(await blogService.getAll())
  }

  const deleteBlog = async (blog) => {
    console.log('hai')
    await blogService.deleteBlog(blog.id, user.token)
    setBlogs(await blogService.getAll())
  }

  return (
    <div>
      <div>
        <h2>blogs</h2>
        {user.name} logged in
        <button onClick={handleLogout}>Logout</button>
        <br />

        <Notification
          message={message}
        />

        <Togglable ref={blogFormRef}>
          <h2>Create new Blog</h2>
          <BlogForm
            createBlog={createBlog}
          />
        </Togglable>

        {blogs.filter(
          blog => blog.user.username === user.username
        ).sort(
          (a, b) => b.likes - a.likes
        ).map(blog =>
          <Blog key={blog.id} blog={blog} updateBlog={incrLikes} deleteBlog={deleteBlog} />
        )}
      </div>
    </div>
  )
}

export default App