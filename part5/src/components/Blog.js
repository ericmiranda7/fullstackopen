import React, { useRef, useState } from 'react'

const styles = {
  borderStyle: 'solid',
  borderWidth: '1px',
  margin: '5px',
  padding: '2px'
}

const Blog = ({ blog }) => {
  const [detailedView, setDetailedView] = useState(false)

  return (
    <div style={styles}>
      {blog.title} {blog.author} <button onClick={() => setDetailedView(!detailedView)}>{detailedView ? 'hide' : 'show'}</button>
      { detailedView
        ? (
          <div>
          <p>{blog.url}</p>
          <p>{blog.likes} <button>like</button></p>
          <p>{blog.user.name}</p>
          </div>
        )
        : null
      }
    </div>
  )
}

export default Blog