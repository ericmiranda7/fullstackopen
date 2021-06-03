import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import AnecdoteFilter from './components/AnecdoteFilter'
import AnecdoteForm from './components/AnecdoteForm'
import AnecdoteList from './components/AnecdoteList'
import Notification from './components/Notification'
import anecdoteService from './services/anecdoteService'
import { initialiseAnecdotes } from './reducers/anecdoteReducer'

const App = () => {
  const dispatch = useDispatch()

  useEffect(() => {
    anecdoteService.getAll().then(data => dispatch(initialiseAnecdotes(data)))
  },
    [dispatch]
  )

  return (
    <div>
      <h2>Anecdotes</h2>
      <AnecdoteFilter />
      <Notification />
      <AnecdoteList />
      <AnecdoteForm />
    </div>
  )
}

export default App