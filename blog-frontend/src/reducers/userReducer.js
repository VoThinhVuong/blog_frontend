import { createSlice } from '@reduxjs/toolkit'
import loginSerice from '../services/login'
import blogService from '../services/blogs'

const userSlice = createSlice({
    name: 'user',
    initialState: null,
    reducers: {
        setUser(state, action) {
            return action.payload
        },
        clearUser(state, action) {
            return null
        }
    }
})

export const userLogin = (username, password) => {
    return async dispatch => {
        const user = await loginSerice.login({ username, password })
        dispatch(setUser(user))
        window.localStorage.setItem('loggedUser', JSON.stringify(user))
        await blogService.setToken(user.token)
    }
}

export const userLogout = () => {
    return async dispatch => {
        window.localStorage.removeItem('loggedUser')
        await blogService.setToken(null)
        dispatch(clearUser())
    }
}

export const { setUser, clearUser } = userSlice.actions
export default userSlice.reducer