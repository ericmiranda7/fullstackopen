import React, { useRef, useState } from 'react'

const styles = {
  borderStyle: 'solid',
  borderWidth: '1px',
  margin: '5px',
  padding: '2px'
}

const Blog = ({ blog, updateBlog, deleteBlog }) => {
  const [detailedView, setDetailedView] = useState(false)

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

  return (
    <div style={styles}>
      {blog.title} {blog.author} <button onClick={() => setDetailedView(!detailedView)}>{detailedView ? 'hide' : 'show'}</button>
      { detailedView
        ? (
          <div>
          <p>{blog.url}</p>
          <p>{blog.likes} <button onClick={handleLike}>like</button></p>
          <p>{blog.user.name}</p>
          <button onClick={handleDelete}>remove</button>
          </div>
        )
        : null
      }
    </div>
  )
}

export default Blog