import { createSlice } from '@reduxjs/toolkit'
import blogService from '../services/blogs'

const blogSlice = createSlice({
    name: 'blogs',
    initialState: [],
    reducers: {
        addBlog(state, action) {
            return state.concat(action.payload)
        },
        removeBlog(state, action) {
            const blogs = state.filter((blog) => blog.id !== action.payload.id)
            return blogs
        },
        replaceBlog(state, action) {
            const blogs = state.map((blog) => blog.id === action.payload.id ? action.payload : blog)
            return blogs
        },
        setBlogs(state, action) {
            return action.payload
        }
    }
})

export const initBlogs = () => {
    return async dispatch => {
        const blogs = await blogService.getAll()
        dispatch(setBlogs(blogs))
    }
}

export const deleteBlog = (blog) => {
    return async dispatch => {
        const response = await blogService.deleteBlog(blog.id)
        if (!response.error) dispatch(removeBlog(blog))
    }
}

export const createBlog = (blog) => {
    return async dispatch => {
        const response = await blogService.postBlog(blog)
        if(!response.error) {
            const newBlog = response
            newBlog['user'] = {
                id: newBlog['user'],
                name: JSON.parse(window.localStorage.getItem('loggedUser'))['name'],
                username: JSON.parse(window.localStorage.getItem('loggedUser'))['username']
            }
            dispatch(addBlog(newBlog))

        }
    }
}

export const likeBlog = (blog) => {
    return async dispatch => {
        const newBlog = { ...blog, likes: blog.likes + 1 }
        const response = await blogService.likeBlog(newBlog)
        if(!response.error) dispatch(replaceBlog(newBlog))
    }
}

export const commentBlog = (newBlog) => {
    return async dispatch => {
        const response = await blogService.commentBlog(newBlog)
        if(!response.error) dispatch(replaceBlog(newBlog))
    }
}

export const { addBlog,  removeBlog, replaceBlog, setBlogs } = blogSlice.actions
export default blogSlice.reducer