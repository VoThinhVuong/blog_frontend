import React, { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { createBlog } from '../reducers/blogReducer'
import { showSuccess, showError } from '../reducers/notificationReducer'
import blogService from '../services/blogs'

const BlogForm = ({ toggleVisibility }) => {
    const [author, setAuthor] = useState('')
    const [title, setTitle] = useState('')
    const [url, setUrl] = useState('')

    const blogs = useSelector(({ blogs }) => blogs)
    const dispatch = useDispatch()

    const handleBlog = async (event) => {
        event.preventDefault()
        const newBlog = { author,title, url }

        try{
            toggleVisibility()
            newBlog['user'] = {
                id: newBlog['user'],
                name: JSON.parse(window.localStorage.getItem('loggedUser'))['name'],
                username: JSON.parse(window.localStorage.getItem('loggedUser'))['username']
            }
            setAuthor('')
            setTitle('')
            setUrl('')
            dispatch(createBlog(newBlog))
            showSuccess(`a new blog '${newBlog.title}' by ${newBlog.author} added`)
        }
        catch(exception) {
            showError(exception.error)
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