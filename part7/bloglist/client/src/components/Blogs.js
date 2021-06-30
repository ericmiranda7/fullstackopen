import Togglable from './Togglable'
import React, { useRef } from 'react'
import Blog from './Blog'
import blogService from '../services/blogs'
import BlogForm from './BlogForm'
import { getBlogsFromDb, likeBlog } from '../reducers/blogReducer'
import { useSelector, useDispatch } from 'react-redux'
import { setMessage, clearNotification } from '../reducers/notificationReducer'


const Blogs = () => {
  const blogs = useSelector(state => state.blogs)
  const dispatch = useDispatch()
  const user = useSelector(state => state.user)

  const blogFormRef = useRef()
  const createBlog = async blog => {
    blogFormRef.current.toggleVisibility()

    const token = user.token

    await blogService.postBlog(blog, token)
    dispatch(getBlogsFromDb())
    dispatch(setMessage({
      text: 'Blog created successfully',
      type: 'success'
    }))
    setTimeout(() => dispatch(clearNotification), 5000)
  }

  const incrLikes = blog => {
    blogService.updateBlog(blog)
    dispatch(likeBlog(blog))
  }

  const deleteBlog = async (blog) => {
    await blogService.deleteBlog(blog.id, user.token)
    dispatch(getBlogsFromDb())
  }
  return (
    <div>
      <Togglable buttonText='Create Blog' ref={blogFormRef}>
        <h2>Create new Blog</h2>
        <BlogForm
          createBlog={createBlog}
        />
      </Togglable>

      {
        blogs.sort(
          (a, b) => b.likes - a.likes
        ).map(blog =>
          <Blog key={blog.id} user={user} blog={blog} updateBlog={incrLikes} deleteBlog={deleteBlog} />
        )
      }
    </div>
  )
}

export default Blogs