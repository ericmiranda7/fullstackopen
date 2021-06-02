import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setFilter } from '../reducers/filterReducer'

const AnecdoteFilter = () => {
  const filter = useSelector(state => state.filter)
  const dispatch = useDispatch()

  const handler = event => {
    dispatch(setFilter(event.target.value))
  }

  return (
    <div>
      <label htmlFor="filter">
        Filter with: <input onChange={handler} value={filter} name="filter" type="text" id="filter" />
      </label>
    </div>
  )
}

export default AnecdoteFilter