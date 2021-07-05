import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import useField from '../hooks/useField'
import blogService from '../services/blogs'
import { useDispatch } from 'react-redux'
import { getBlogsFromDb } from '../reducers/blogReducer'
import { useHistory } from 'react-router'
import { Button } from 'react-bootstrap'
import { Card, ListGroup, ListGroupItem } from 'react-bootstrap'

const Blog = ({ blog, updateBlog, deleteBlog, user, show = false }) => {
  if (!blog) return null

  const [detailedView, setDetailedView] = useState(show)
  const comment = useField('text')
  const dispatch = useDispatch()
  const history = useHistory()

  const handleLike = async () => {
    const newBlog = {
      ...blog,
      likes: blog.likes + 1
    }

    updateBlog(newBlog)
  }

  const handleDelete = () => {
    return window.confirm(`Are you sure you want to remove blog: ${blog.title} by ${blog.author} ?`)
      ? deleteBlog(blog)
      : null
  }

  const handleSubmitComment = (e) => {
    e.preventDefault()

    blogService.postComment(blog, comment.value)
    dispatch(getBlogsFromDb())
    history.go(0)
  }

  return (
    <div className="blog" >
      <Card >
        <Card.Body>
          <Card.Title>
            <Link to={`/blogs/${blog.id}`}>{blog.title} {blog.author}{' '}</Link>
          </Card.Title>
        </Card.Body>
        <div style={{ display: detailedView ? '' : 'none' }}>
          <ListGroup className="list-group-flush">
            <ListGroupItem>
              Website: <a href={blog.url}>{blog.url}</a>
            </ListGroupItem>
            <ListGroupItem>
              {blog.likes} <Button className="likeButton" onClick={handleLike}>like</Button>
            </ListGroupItem>
            <ListGroupItem>
              added by {blog.user.name}
            </ListGroupItem>
          </ListGroup>
          <Card.Body>
            <div>
              <h3>comments</h3>
              <div>
                <form>
                  <input {...comment} />
                  <Button type="submit" onClick={handleSubmitComment}>add comment</Button>
                </form>
              </div>
              <ul>
                {
                  blog.comments.map((comment, i) => <li key={i}>{comment}</li>)
                }
              </ul>
            </div>
          </Card.Body>
          <Card.Body>
            {blog.user.username === user.username &&
              <Button onClick={handleDelete}>Remove Blog</Button>}
          </Card.Body>
        </div>
      </Card>
      <div>
        <Button id="show-details-button" style={{ display: 'none' }} onClick={() => setDetailedView(!detailedView)}>{detailedView ? 'hide' : 'show'}</Button>
      </div>
    </div >
  )
}

export default Blog