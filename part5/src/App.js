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

  const handleLogin = async (event) => {
    event.preventDefault()

    try {
      const user = await loginService.login({ username, password })
      
      setUser(user)
      setUsername('')
      setPassword('')
    } catch {
      console.log('invalid creds')
    } 
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

  return (
    <div>
    {user === null
      ? <Login
          handleLogin={handleLogin}
          username={username}
          setUsername={setUsername}
          password={password}
          setPassword={setPassword}  
        />
      : showBlogs()}
    </div>
  )
}

export default App