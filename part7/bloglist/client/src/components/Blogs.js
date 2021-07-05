import Togglable from './Togglable'
import React, { useRef } from 'react'
import Blog from './Blog'
import blogService from '../services/blogs'
import BlogForm from './BlogForm'
import { getBlogsFromDb, likeBlog } from '../reducers/blogReducer'
import { useSelector, useDispatch } from 'react-redux'
import { setMessage, clearNotification } from '../reducers/notificationReducer'
import { Switch, Route, useRouteMatch } from 'react-router'
import { Card, ListGroup } from 'react-bootstrap'

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

  const matchBlog = useRouteMatch('/blogs/:id')
  const displayBlog = matchBlog
    ? blogs.find(blog => blog.id === String(matchBlog.params.id))
    : null

  const incrLikes = blog => {
    blogService.updateBlog(blog)
    dispatch(likeBlog(blog))
  }

  const deleteBlog = async (blog) => {
    await blogService.deleteBlog(blog.id, user.token)
    dispatch(getBlogsFromDb())
  }

  return (
    <Switch>
      <Route path="/:id">
        <Blog show user={user} blog={displayBlog} updateBlog={incrLikes} deleteBlog={deleteBlog} />
      </Route>
      <Route path="/">
        <div>
          <div className="mb-2">
            <Togglable buttonText='Create Blog' ref={blogFormRef}>
              <h2>Create new Blog</h2>
              <BlogForm
                createBlog={createBlog}
              />
            </Togglable>
          </div>
          {
            blogs.sort(
              (a, b) => b.likes - a.likes
            ).map(blog =>
              <Card key={blog.id} >
                <ListGroup variant="flush">
                  <ListGroup.Item>
                    <Blog user={user} blog={blog} updateBlog={incrLikes} deleteBlog={deleteBlog} />
                  </ListGroup.Item>
                </ListGroup>

              </Card>
            )
          }
        </div>
      </Route>
    </Switch>
  )
}

export default Blogs