const notificationReducer = (state = null, action) => {
  switch (action.type) {
    case 'NOTIFY':
      return action.message
    case 'CLEAR':
      return null
    default:
      return state
  }
}

export const setNotification = message => {
  return {
    type: 'NOTIFY',
    message
  }
}

export const removeNotification = () => {
  return {
    type: 'CLEAR'
  }
}

export default notificationReducer