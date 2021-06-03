import anecdoteService from '../services/anecdoteService'

const getId = () => (100000 * Math.random()).toFixed(0)

const asObject = (anecdote) => {
  return {
    content: anecdote,
    id: getId(),
    votes: 0
  }
}

// Action creators
export const voteAnecdote = id => {
  return async (dispatch) => {
    await anecdoteService.voteAnecdote(id)
    dispatch({
      type:'VOTE',
      payload: id
    })
  }
}

export const addAnecdote = content => {
  return async (dispatch) => {
    const anecdote = await anecdoteService.createAnecdote(content)
    dispatch({
      type: 'ADD',
      payload: anecdote
    })
  }
}

export const initialiseAnecdotes = () => {
  return async (dispatch) => {
    const anecdotes = await anecdoteService.getAll()
    dispatch({
      type: 'INIT',
      payload: anecdotes
    })
  }
}

const anecdoteReducer = (state = [], action) => {
  console.log('state now: ', state)
  console.log('action', action)

  switch (action.type) {
    case 'VOTE':
      return state.map(anec => anec.id === action.payload
        ? { ...anec, votes: anec.votes + 1 }
        : anec)
    case 'ADD':
      return [...state, action.payload]
    case 'INIT':
      return [...action.payload]
    default:
      return state
  }
}

export default anecdoteReducer