import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { voteAnecdote } from '../reducers/anecdoteReducer'
import { removeNotification, setNotification } from '../reducers/notificationReducer'

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
  const anecdotes = useSelector(state => state.anecdotes
    .concat()
    .sort((a, b) => b.votes - a.votes))
  const filter = useSelector(state => state.filter)
  const dispatch = useDispatch()

  const vote = (id) => {
    dispatch(voteAnecdote(id))
    dispatch(setNotification(`You voted for anecdote '${anecdotes.find(anec => anec.id === id).content}'`, 3))
  }
  return (
    <div>
      {anecdotes
        .filter(anec => anec.content.includes(filter))
        .map(anecdote =>
        <Anecdote key={anecdote.id} anecdote={anecdote} handler={() => vote(anecdote.id)} />)}
    </div>
  )
}

export default AnecdoteList