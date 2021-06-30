import blogService from '../services/blogs'

export const getBlogsFromDb = () => {
  return async dispatch => {
    const blogs = await blogService.getAll()
    dispatch({
      type: 'SET_BLOGS',
      payload: { blogs }
    })
  }
}

export const likeBlog = (blog) => {
  return {
    type: 'LIKE_BLOG',
    payload: { blog }
  }
}

const blogReducer = (state = [], action) => {
  switch (action.type) {
    case 'SET_BLOGS':
      return action.payload.blogs
    case 'LIKE_BLOG':
      return state.map(blog => blog.id === action.payload.blog.id ? { ...blog, likes: blog.likes + 1 } : blog)
    default:
      return state
  }
}

export default blogReducer