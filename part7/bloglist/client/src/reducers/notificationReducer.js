const initialState = {}

export const setMessage = (notif) => {
  return {
    type: 'SET_MESSAGE',
    payload: { notification: notif }
  }
}

export const clearNotification = () => {
  return { type: 'CLEAR_MESSAGE' }
}

const notificationReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'SET_MESSAGE': {
      return action.payload.notification
    }

    case 'CLEAR_MESSAGE': {
      return {}
    }

    default:
      return state
  }
}

export default notificationReducer