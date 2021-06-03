import React from 'react'
import { useDispatch } from 'react-redux'
import { addAnecdote } from '../reducers/anecdoteReducer'
import { setNotification, removeNotification } from '../reducers/notificationReducer'
import anecdoteService from '../services/anecdoteService'

const AnecdoteForm = () => {
  const dispatch = useDispatch()

  const handleInput = async (event) => {
    event.preventDefault()

    const content = event.target.content.value
    const anecdote = await anecdoteService.createAnecdote(content)

    dispatch(addAnecdote(anecdote))

    event.target.content.value = ''
    dispatch(setNotification(`Anecdote '${content}' added`))
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