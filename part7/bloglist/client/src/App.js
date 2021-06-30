import React, { useState, useEffect, useRef } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import LoginForm from './components/LoginForm'
import loginService from './services/login'
import BlogForm from './components/BlogForm'
import Notification from './components/Notification'
import Togglable from './components/Togglable'
import { useSelector, useDispatch } from 'react-redux'
import { clearNotification, setMessage } from './reducers/notificationReducer'
import { getBlogsFromDb } from './reducers/blogReducer'

const App = () => {
  const blogs = useSelector(state => {
    console.log(state.blogs)
    return state.blogs
  })
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const message = useSelector(state => state.notification)
  const dispatch = useDispatch()
  const blogFormRef = useRef()

  useEffect(() => {
    dispatch(getBlogsFromDb())
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
      dispatch(
        setMessage({
          text: 'Username or password invalid',
          type: 'error'
        })
      )
      setTimeout(() => dispatch(clearNotification()), 5000)
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
    dispatch(getBlogsFromDb())
    dispatch(setMessage({
      text: 'Blog created successfully',
      type: 'success'
    }))
    setTimeout(() => dispatch(clearNotification), 5000)
  }

  const incrLikes = blog => {
    /*     setBlogs(blogs.map(
          b => {
            if (b.id === blog.id) b.likes++
            return b
          }
        )) */
    blogService.updateBlog(blog)
    dispatch(getBlogsFromDb())
  }

  const deleteBlog = async (blog) => {
    await blogService.deleteBlog(blog.id, user.token)
    dispatch(getBlogsFromDb())
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

        <Togglable buttonText='Create Blog' ref={blogFormRef}>
          <h2>Create new Blog</h2>
          <BlogForm
            createBlog={createBlog}
          />
        </Togglable>

        {blogs.sort(
          (a, b) => b.likes - a.likes
        ).map(blog =>
          <Blog key={blog.id} user={user} blog={blog} updateBlog={incrLikes} deleteBlog={deleteBlog} />
        )}
      </div>
    </div>
  )
}

export default App