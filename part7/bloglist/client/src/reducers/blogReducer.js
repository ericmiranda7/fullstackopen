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

const blogReducer = (state = [], action) => {
  switch (action.type) {
    case 'SET_BLOGS':
      console.log(action.payload.blogs)
      return action.payload.blogs
    default:
      return state
  }
}

export default blogReducer