let timeouts = [];

const notificationReducer = (state = null, action) => {
  switch (action.type) {
    case 'NOTIFY':
      return action.payload
    case 'CLEAR':
      return null
    default:
      return state
  }
}

export const setNotification = (message, timeout) => {
  return async (dispatch) => {
    dispatch({
      type: 'NOTIFY',
      payload: message,
    })
    timeouts.forEach(t => clearTimeout(t))
    timeouts = []
    timeouts = timeouts.concat(setTimeout(
      () => dispatch(removeNotification()),
      timeout * 1000
    ))
  }
}

export const removeNotification = () => {
  return {
    type: 'CLEAR'
  }
}

export default notificationReducer