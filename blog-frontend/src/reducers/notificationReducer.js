import { createSlice } from '@reduxjs/toolkit'

const notiSlice = createSlice({
    name: 'notification',
    initialState: null,
    reducers: {
        setNoti(state, action) {
            return action.payload
        },
        clearNoti(state, action) {
            return null
        }
    }
})

export const showSuccess = (content) => {
    return async dispatch => {
        const obj = { content, type: 'succ' }
        dispatch(setNoti(content))
        setTimeout(() => dispatch(clearNoti()), 5000)
    }
}

export const showError = (content) => {
    return async dispatch => {
        const obj = { content, type: 'error' }
        dispatch(setNoti(content))
        setTimeout(() => dispatch(clearNoti()), 5000)
    }
}

export const { setNoti, clearNoti } = notiSlice.reducer
export default notiSlice.reducer