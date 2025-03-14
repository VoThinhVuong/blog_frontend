import React, { useState } from 'react'
import blogService from '../services/blogs'

const BlogForm = ({ blogs, setBlogs, setMsg, setType, toggleVisibility, mockHandler }) => {
    const [author, setAuthor] = useState('')
    const [title, setTitle] = useState('')
    const [url, setUrl] = useState('')


    const handleBlog = async (event) => {
        event.preventDefault()
        if(mockHandler) mockHandler({ author,title, url })
        try{
            toggleVisibility()
            const newBlog = await blogService.postBlog({ author,title, url })
            newBlog['user'] = {
                id: newBlog['user'],
                name: JSON.parse(window.localStorage.getItem('loggedUser'))['name'],
                username: JSON.parse(window.localStorage.getItem('loggedUser'))['username']
            }
            //console.log(newBlog)
            const newBlogs = blogs.concat(newBlog)
            //console.log(newBlogs)
            setAuthor('')
            setTitle('')
            setUrl('')
            setBlogs(newBlogs.sort((a,b) => b.likes - a.likes))

            setType('succ')
            setMsg(`a new blog '${newBlog.title}' by ${newBlog.author} added`)
            setTimeout(() => setMsg(null), 5000)
        }
        catch(exception) {
            try {
                setType('error')
                setMsg(exception.response.data.error)
                setTimeout(() => setMsg(null), 5000)
            }
            catch(error) {
                console.log(exception)
            }

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