import { configureStore  } from '@reduxjs/toolkit'
import blogReducer from './reducers/blogReducer'
import notificationReducer  from './reducers/notificationReducer'
import userReducer from './reducers/userReducer'

export const store = configureStore({
    reducer: {
        user: userReducer,
        blogs: blogReducer,
        notification: notificationReducer
    }
})