const notificationReducer = (state = null, action) => {
  switch (action.type) {
    case 'NOTIFY':
      return action.message
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

export default notificationReducer