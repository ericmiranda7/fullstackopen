import React from 'react'
import { useDispatch } from 'react-redux'
import { addAnecdote } from '../reducers/anecdoteReducer'
import { setNotification, removeNotification } from '../reducers/notificationReducer'

const AnecdoteForm = props => {
  const dispatch = useDispatch()

  const handleInput = (event) => {
    event.preventDefault()
    let anecdote = event.target.content.value
    dispatch(addAnecdote(anecdote))
    event.target.content.value = ''

    dispatch(setNotification(`Anecdote '${anecdote}' added`))
    setTimeout(
      () => dispatch(removeNotification()),
      3000
    )
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