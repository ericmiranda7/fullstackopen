export const setUser = (user) => {
  return {
    type: 'SET_USER',
    payload: { user }
  }
}

const userReducer = (state = {}, action) => {
  switch (action.type) {
    case 'SET_USER':
      return action.payload.user
    default:
      return state
  }
}

export default userReducer