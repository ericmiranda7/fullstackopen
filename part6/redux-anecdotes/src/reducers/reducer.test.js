import { createStore } from 'redux'
import reducer from './anecdoteReducer'

const state = [
  {
    content: 'blahblah',
    id: 0,
    votes: 1
  },
  {
    content: 'blahblahpt2',
    id: 1,
    votes: 0
  }
]

describe('anecdoteReducer tests', () => {
  test('vote action increments votes', () => {
    const newState = reducer(state, { type: 'VOTE', data: { id: 1 } })

    expect(newState[1]).toEqual({ ...state[1], votes: 1 })
  })

  test('add action adds votes', () => {
    const newAnecdote = {
      content: 'new Anec',
    }

    const newState = reducer(state, { type: 'ADD', data: { anecdote: newAnecdote } })

    expect(newState).toHaveLength(3)
  })
})