import { useState } from 'react'
import { useHistory } from 'react-router-dom'
import { useField } from '../hooks'

const CreateNew = (props) => {
  const content = useField('text')
  const author = useField('text')
  const info = useField('text')
  
  const history = useHistory()

  const handleSubmit = (e) => {
    e.preventDefault()
    props.addNew({
      content: content.value,
      author: author.value,
      info: info.value,
      votes: 0
    })

    history.push('/')
    props.setNotif(content.value)
    setTimeout(
      () => props.setNotif(null),
      10000
    )
  }

  const handleReset = (event) => {
    event.preventDefault()
    content.reset()
    author.reset()
    info.reset()
  }

  return (
    <div>
      <h2>create a new anecdote</h2>
      <form onSubmit={handleSubmit}>
        <div>
          content
          <input name='content' {...content} reset="" />
        </div>
        <div>
          author
          <input name='author' {...author} reset="" />
        </div>
        <div>
          url for more info
          <input name='info' {...info} reset="" />
        </div>
        <button type="submit">create</button>
        <button onClick={handleReset}>reset</button>
      </form>
    </div>
  )
}

export default CreateNew