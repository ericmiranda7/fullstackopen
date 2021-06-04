import React from 'react'
import { setFilter } from '../reducers/filterReducer'
import { connect } from 'react-redux'

const AnecdoteFilter = props => {
  const handler = event => {
    props.setFilter(event.target.value)
  }

  return (
    <div>
      <label htmlFor="filter">
        Filter with: <input onChange={handler} value={props.filter} name="filter" type="text" id="filter" />
      </label>
    </div>
  )
}

const mapStateToProps = state => {
  return {
    filter: state.filter
  }
}

const mapDispatchToProps = {
  setFilter
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AnecdoteFilter)