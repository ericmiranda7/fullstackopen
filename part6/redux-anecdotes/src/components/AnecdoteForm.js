import React from 'react'
import { addAnecdote } from '../reducers/anecdoteReducer'
import { setNotification } from '../reducers/notificationReducer'
import { connect } from 'react-redux'

const AnecdoteForm = props => {
  const handleInput = async (event) => {
    event.preventDefault()

    const content = event.target.content.value
    event.target.content.value = ''

    props.addAnecdote(content)
    props.setNotification(`Anecdote '${content}' added`, 3)
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

const mapDispatchToProps = {
  addAnecdote,
  setNotification
}

export default connect(
  null,
  mapDispatchToProps
)(AnecdoteForm)