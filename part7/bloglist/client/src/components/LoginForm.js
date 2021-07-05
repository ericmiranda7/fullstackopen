import React from 'react'
import { Form, Button } from 'react-bootstrap'

const loginForm = ({ handleLogin, username, setUsername, password, setPassword }) => (
  <div className="container" >
    <h2>Please Login</h2>
    <Form onSubmit={handleLogin}>
      <Form.Group>
        <Form.Label htmlFor="username">Username:</Form.Label>
        <Form.Control
          id="username"
          type="text"
          name="username"
          value={username}
          onChange={({ target }) => setUsername(target.value)}
        />
      </Form.Group>
      <Form.Group>
        <Form.Label htmlFor="password">Password:</Form.Label>
        <Form.Control
          id="password"
          type="password"
          name="password"
          value={password}
          onChange={({ target }) => setPassword(target.value)}
        />
      </Form.Group>
      <Button className="mt-2" type="submit">Login</Button>
    </Form>
  </div>
)

export default loginForm