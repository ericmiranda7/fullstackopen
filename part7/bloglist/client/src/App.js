import React, { useState, useEffect } from 'react'
import LoginForm from './components/LoginForm'
import loginService from './services/login'
import Notification from './components/Notification'
import { useSelector, useDispatch } from 'react-redux'
import { clearNotification, setMessage } from './reducers/notificationReducer'
import { getBlogsFromDb } from './reducers/blogReducer'
import { setUser } from './reducers/userReducer'
import { Switch, Route, useRouteMatch, useHistory } from 'react-router-dom'
import Blogs from './components/Blogs'
import Users from './components/Users'
import userService from './services/users'
import User from './components/User'

const App = () => {
  const user = useSelector(state => state.user)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const message = useSelector(state => state.notification)
  const dispatch = useDispatch()
  const [users, setUsers] = useState([])
  const history = useHistory()

  useEffect(async () => {
    const users = await userService.getAll()
    setUsers(users)
  }, [])

  useEffect(() => {
    dispatch(getBlogsFromDb())
  }, [])

  useEffect(() => {
    const user = window.localStorage.getItem('user')
    dispatch(setUser(JSON.parse(user)))
  }, [])

  const handleLogin = async (event) => {
    event.preventDefault()

    try {
      const user = await loginService.login({ username, password })

      window.localStorage.setItem('user', JSON.stringify(user))
      dispatch(setUser(user))
      setUsername('')
      setPassword('')
      history.push('/')
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
    dispatch(setUser(null))
    history.push('/')
  }

  const matchUser = useRouteMatch('/users/:id')
  const displayUser = matchUser
    ? users.find(user => user.id === String(matchUser.params.id))
    : null


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

        <Switch>
          <Route path="/users/:id">
            <User user={displayUser} />
          </Route>
          <Route path="/users">
            <Users users={users} />
          </Route>
          <Route path="/">
            <Blogs />
          </Route>
        </Switch>

      </div>
    </div>
  )
}

export default App