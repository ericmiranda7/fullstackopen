import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { voteAnecdote, addAnecdote } from './reducers/anecdoteReducer'

const App = () => {
  const anecdotes = useSelector(state => state
    .concat()
    .sort((a, b) => b.votes - a.votes))
  const dispatch = useDispatch()

  const vote = (id) => {
    dispatch(voteAnecdote(id))
  }

  const handleInput = (event) => {
    event.preventDefault()
    dispatch(addAnecdote(event.target.content.value))
    event.target.content.value = ''
  }

  return (
    <div>
      <h2>Anecdotes</h2>
      {anecdotes
        .map(anecdote =>
        <div key={anecdote.id}>
          <div>
            {anecdote.content}
          </div>
          <div>
            has {anecdote.votes}
            <button onClick={() => vote(anecdote.id)}>vote</button>
          </div>
        </div>
      )}
      <h2>create new</h2>
      <form onSubmit={handleInput} >
        <div><input name="content" /></div>
        <button type="submit" >create</button>
      </form>
    </div>
  )
}

export default App