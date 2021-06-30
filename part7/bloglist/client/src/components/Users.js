import React, { useEffect, useState } from 'react'
import userService from '../services/users'

const Users = () => {
  const [users, setUsers] = useState([])

  useEffect(async () => {
    const users = await userService.getAll()
    setUsers(users)
  }, [])

  return (
    <div>
      <h2>Users</h2>
      <table>
        <tr>
          <th>User Names</th>
          <th>Blogs Created</th>
        </tr>
        {
          users.map(user => {
            return <tr key={user.id}><td>{user.name}</td><td>{user.blogs.length}</td></tr>
          })
        }

      </table>
    </div>
  )
}

export default Users