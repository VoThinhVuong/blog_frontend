import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { createBlog } from '../reducers/blogReducer'
import { showSuccess, showError } from '../reducers/notificationReducer'
import blogService from '../services/blogs'

const BlogForm = ({ toggleVisibility }) => {
    const [author, setAuthor] = useState('')
    const [title, setTitle] = useState('')
    const [url, setUrl] = useState('')

    const dispatch = useDispatch()

    const handleBlog = async (event) => {
        event.preventDefault()
        const newBlog = { author,title, url, likes: 0 }

        try{
            toggleVisibility()
            setAuthor('')
            setTitle('')
            setUrl('')
            await dispatch(createBlog(newBlog))
            dispatch(showSuccess(`a new blog '${newBlog.title}' by ${newBlog.author} added`))
        }
        catch(exception) {
            dispatch(showError(exception.response.data.error))
        }
    }



    return (
        <form onSubmit={handleBlog}>
            <div>title: <input id='title' type='text' value={title} onChange={({ target }) => setTitle(target.value)}></input></div>
            <div>author: <input id='author' type='text' value={author} onChange={({ target }) => setAuthor(target.value)}></input></div>
            <div>url: <input id='url' type='text' value={url} onChange={({ target }) => setUrl(target.value)}></input></div>
            <input id="create" type='Submit' value='create'></input>
        </form>
    )
}

export default BlogForm