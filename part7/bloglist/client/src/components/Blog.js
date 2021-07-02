import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import useField from '../hooks/useField'
import blogService from '../services/blogs'
import { useDispatch } from 'react-redux'
import { getBlogsFromDb } from '../reducers/blogReducer'
import { useHistory } from 'react-router'

const styles = {
  borderStyle: 'solid',
  borderWidth: '1px',
  margin: '5px',
  padding: '2px'
}

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
    <div className="blog" style={styles} >
      <div>
        <Link to={`/blogs/${blog.id}`}>{blog.title} {blog.author}{' '}</Link>
        <button id="show-details-button" style={{ display: 'none' }} onClick={() => setDetailedView(!detailedView)}>{detailedView ? 'hide' : 'show'}</button>
      </div>
      <div className="details" style={{ display: detailedView ? '' : 'none' }}>
        <p>{blog.url}</p>
        <p id="likes">{blog.likes} <button className="likeButton" onClick={handleLike}>like</button></p>
        <p>added by {blog.user.name}</p>
        {blog.user.username === user.username &&
          <button onClick={handleDelete}>remove</button>}
        <div>
          <h3>comments</h3>
          <div>
            <form>
              <input {...comment} />
              <button type="submit" onClick={handleSubmitComment}>add comment</button>
            </form>
          </div>
          <ul>
            {
              blog.comments.map((comment, i) => <li key={i}>{comment}</li>)
            }
          </ul>
        </div>
      </div>
    </div>
  )
}

export default Blog