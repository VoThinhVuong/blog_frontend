import { createSlice } from '@reduxjs/toolkit'

const notiSlice = createSlice({
    name: 'notification',
    initialState: null,
    reducers: {
        setNotification(state, action) {
            return action.payload
        },
        clearNotification(state, action) {
            return null
        }
    }
})

export const showSuccess = (content) => {
    return async dispatch => {
        const obj = { content, type: 'success' }
        dispatch(setNotification(obj))
        setTimeout(() => dispatch(clearNotification()), 5000)
    }
}

export const showError = (content) => {
    return async dispatch => {
        const obj = { content, type: 'error' }
        dispatch(setNotification(obj))
        setTimeout(() => dispatch(clearNotification()), 5000)
    }
}

export const { setNotification, clearNotification } = notiSlice.actions
export default notiSlice.reducer