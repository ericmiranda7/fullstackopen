import React from 'react'
import { useDispatch } from 'react-redux'
import { addAnecdote } from '../reducers/anecdoteReducer'
import { setNotification, removeNotification } from '../reducers/notificationReducer'

const AnecdoteForm = () => {
  const dispatch = useDispatch()

  const handleInput = async (event) => {
    event.preventDefault()

    const content = event.target.content.value
    event.target.content.value = ''

    dispatch(addAnecdote(content))
    dispatch(setNotification(`Anecdote '${content}' added`, 3))
  }

  return (
    <div>
      <h2>create new</h2>
      <form onSubmit={handleInput} >
        <div><input name="content" /></div>
        <button type="submit" >create</button>
      </form>
    </div>
  )
}

export default AnecdoteForm