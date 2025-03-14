import React from 'react'
import { useState } from 'react'
import blogService from '../services/blogs'

const Blog = ({ blog, blogs, setBlogs, user, setMsg, setType, mockHandler }) => {
    const [visible,setVisible] = useState(false)

    const blogStyle = {
        paddingTop: 10,
        paddingLeft: 2,
        border: 'solid',
        borderWidth: 1,
        marginBottom: 5
    }

    const buttonLabel = visible ? 'hide' : 'view'
    const showWhenVisible = { display: visible ? '' : 'none' }

    const handleView = () => {
        setVisible(!visible)
    }

    const handleLike = async () => {
        if(mockHandler) mockHandler()
        let newBlog = blog
        newBlog.likes += 1
        //console.log(newBlog.likes)
        try{
            newBlog = await blogService.likeBlog(newBlog)
            newBlog['user'] = {
                id: blog['user']['id'],
                name: blog['user']['name'],
                username: blog['user']['username']
            }

            const newBlogs = blogs.map(blog => blog.id === newBlog.id ? newBlog : blog)
            setBlogs(newBlogs.sort((a,b) => b.likes - a.likes))
        }
        catch(exception) {
            try{
                setType('error')
                setMsg(exception.response.data.error)
                setTimeout(() => setMsg(null), 5000)
            }
            catch(error) {
                console.log(exception)
            }

        }
    }

    const handleDelete = async () => {
        if(window.confirm(`Remove blog ${blog.title} by ${blog.author}?`)){
            try{
                await blogService.deleteBlog(blog.id)
                const newBlogs = blogs.filter(Blog => Blog.id !== blog.id)
                setBlogs(newBlogs.sort((a,b) => b.likes - a.likes))
                setType('succ')
                setMsg(`Removed blog ${blog.title} by ${blog.author}`)
                setTimeout(() => setMsg(null), 5000)
            }
            catch(error) {
                setType('error')
                setMsg(error.response.data.error)
                setTimeout(() => setMsg(null), 5000)
            }
        }
    }

    return(

        <div style={blogStyle} className='Blog'>
            <div>
                {blog.title} {blog.author} <button onClick={handleView} className='button'>{buttonLabel}</button>
            </div>

            <div style={showWhenVisible} className='toggableContent'>
                {blog.url}
                <div>likes {blog.likes} <button onClick={handleLike}>like</button></div>
                {blog.user.name}
                {blog.user.username === user.username ?
                    <div><button onClick={() => handleDelete()}>remove</button></div> : null}

            </div>

        </div>
    )}

export default Blog