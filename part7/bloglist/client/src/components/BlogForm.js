import React, { useState } from 'react'
import { Button, Form, FormGroup } from 'react-bootstrap'

const CreateBlog = ({ createBlog }) => {
  const [blogTitle, setTitle] = useState('')
  const [blogAuthor, setAuthor] = useState('')
  const [blogUrl, setUrl] = useState('')

  const handleCreation = async (event) => {
    event.preventDefault()

    const blog = {
      title: blogTitle,
      author: blogAuthor,
      url: blogUrl
    }

    createBlog(blog)
    setTitle('')
    setAuthor('')
    setUrl('')
  }

  return (
    <div>
      <Form onSubmit={handleCreation} className="blogForm" >
        <FormGroup>
          <Form.Label>Title:</Form.Label>
          <Form.Control
            id="title"
            type="text"
            name="title"
            value={blogTitle}
            onChange={({ target }) => setTitle(target.value)}
          />
        </FormGroup>
        <FormGroup>
          <Form.Label>
            Author:
          </Form.Label>
          <Form.Control
            id="author"
            type="text"
            name="author"
            value={blogAuthor}
            onChange={({ target }) => setAuthor(target.value)}
          />
        </FormGroup>
        <FormGroup>
          <Form.Label>
            URL:
          </Form.Label>
          <Form.Control
            id="url"
            type="url"
            name="url"
            value={blogUrl}
            onChange={({ target }) => setUrl(target.value)}
          />
        </FormGroup>
        <Button className="mt-2 mb-2" variant="primary" type="submit">Submit</Button>
      </Form>
    </div>
  )
}

export default CreateBlog