import React, { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import Login from './components/Login'
import loginService from './services/login'
import loginForm from './components/Login'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null) 
  
  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
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
      console.log('invalid creds')
    } 
  }

  const handleLogout = () => {
    window.localStorage.removeItem('user')
    setUser(null)
  }

  const showBlogs = () => (
    <div>
      <h2>blogs</h2>
      <div>{user.name} logged in</div>
      <br/>
      {blogs.filter(
        blog => blog.user.username === user.username
      ).map(blog =>
        <Blog key={blog.id} blog={blog} />
      )}
    </div>
  )

  if (user === null) {
    return (
      <div>
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

  return (
    <div>
      {showBlogs()}
      <br/>
      <button onClick={handleLogout}>Logout</button>
    </div>
  )
}

export default App