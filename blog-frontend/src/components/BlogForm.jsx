import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { createBlog } from '../reducers/blogReducer'
import { showSuccess, showError } from '../reducers/notificationReducer'
import { Button, FormControl, Input, Paper } from '@mui/material'

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
        <form onSubmit={handleBlog} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <Paper elevation={3} sx={{ margin: '5px' }}>title: <Input id='title' type='text' value={title} onChange={({ target }) => setTitle(target.value)}></Input></Paper>
            <Paper sx={{ margin: '5px' }}>author: <Input id='author' type='text' value={author} onChange={({ target }) => setAuthor(target.value)}></Input></Paper>
            <Paper sx={{ margin: '5px' }}>url: <Input id='url' type='text' value={url} onChange={({ target }) => setUrl(target.value)}></Input></Paper>
            <Button id="create" type='Submit' sx={{ margin: '5px' }}>create</Button>
        </form>
    )
}

export default BlogForm