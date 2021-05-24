import React, { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import Login from './components/Login'
import loginService from './services/login'
import CreateBlog from './components/CreateBlog'
import Notification from './components/Notification'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [blogTitle, setTitle] = useState('')
  const [blogAuthor, setAuthor] = useState('')
  const [blogUrl, setUrl] = useState('')
  const [message, setMessage] = useState({})

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

  if (user === null) {
    return (
      <div>
        <Notification
          message={message}
        />
          
        <Login
          handleLogin={handleLogin}
          username={username}
          setUsername={setUsername}
          password={password}
          setPassword={setPassword}
        />
      </div>
    )
  }

  const handleCreation = async (event) => {
    event.preventDefault()

    // create note here
    const token = user.token
    const blog = {
      title: blogTitle,
      author: blogAuthor,
      url: blogUrl
    }
    
    const createdBlog = await blogService.postBlog(blog, token)
    setBlogs(await blogService.getAll())

    setMessage({
      text: 'Blog created successfully',
      type: 'success'
    })
    setTimeout(() => setMessage(null), 5000)
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

        <h2>Create new Blog</h2>
        <CreateBlog
          handleCreation={handleCreation}
          blogTitle={blogTitle}
          setTitle={setTitle}
          blogAuthor={blogAuthor}
          setAuthor={setAuthor}
          blogUrl={blogUrl}
          setUrl={setUrl}
        />
        {blogs.filter(
          blog => blog.user.username === user.username
        ).map(blog =>
          <Blog key={blog.id} blog={blog} />
        )}
      </div>
    </div>
  )
}

export default App