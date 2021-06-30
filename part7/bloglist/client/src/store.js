import { createStore, combineReducers, applyMiddleware } from 'redux'
import notificationReducer from './reducers/notificationReducer'
import blogReducer from './reducers/blogReducer'
import userReducer from './reducers/userReducer'
import thunk from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'

const combinedReducer = combineReducers({ notification: notificationReducer, blogs: blogReducer, user: userReducer })
const store = createStore(combinedReducer, composeWithDevTools(applyMiddleware(thunk)))

export default store