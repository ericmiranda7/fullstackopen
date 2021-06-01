import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { voteAnecdote } from '../reducers/anecdoteReducer'

const Anecdote = ({ anecdote, handler }) => {
  return (
    <div> 
      <div>
        {anecdote.content}
      </div>
      <div>
        has {anecdote.votes}
        <button onClick={handler}>vote</button>
      </div>
    </div>
  )
}

const AnecdoteList = props => {
  const anecdotes = useSelector(state => state
    .concat()
    .sort((a, b) => b.votes - a.votes))
  const dispatch = useDispatch()

  const vote = (id) => {
    dispatch(voteAnecdote(id))
  }
  return (
    <div>
      {anecdotes.map(anecdote =>
        <Anecdote key={anecdote.id} anecdote={anecdote} handler={() => vote(anecdote.id)} />)}
    </div>
  )
}

export default AnecdoteList