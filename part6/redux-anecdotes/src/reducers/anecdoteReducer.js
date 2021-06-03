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
  return {
    type: 'VOTE',
    data: { id }
  }
}

export const addAnecdote = anecdote => {
  return {
    type: 'ADD',
    payload: anecdote
  }
}

export const initialiseAnecdotes = anecdotes => {
  return {
    type: 'INIT',
    payload: anecdotes
  }
}

const anecdoteReducer = (state = [], action) => {
  console.log('state now: ', state)
  console.log('action', action)

  switch (action.type) {
    case 'VOTE':
      return state.map(anec => anec.id === action.data.id
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