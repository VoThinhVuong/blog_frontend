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
                name: JSON.parse(window.localStorage.getItem('loggedUser'))['name']
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
        catch(error) {
            try {
                setType('error')
                setMsg(error.response.data.error)
                setTimeout(() => setMsg(null), 5000)
            }
            catch(error) {
                console.log(error)
            }

        }
    }



    return (
        <form onSubmit={handleBlog}>
            <div>title: <input id='title' value={title} onChange={({ target }) => setTitle(target.value)}></input></div>
            <div>author: <input id='author' value={author} onChange={({ target }) => setAuthor(target.value)}></input></div>
            <div>url: <input id='url' value={url} onChange={({ target }) => setUrl(target.value)}></input></div>
            <input type='Submit' value='create'></input>
        </form>
    )
}

export default BlogForm