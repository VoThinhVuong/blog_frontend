import React from 'react'
import { useState } from 'react'
import blogService from '../services/blogs'

const Blog = ({ blog, blogs, setBlogs, setMsg, setType }) => {
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
    let newBlog = blog
    newBlog.likes += 1
    console.log(newBlog.likes)
    try{
      newBlog = await blogService.likeBlog(newBlog)
      newBlog['user'] = {
        id: newBlog['user'],
        name: JSON.parse(window.localStorage.getItem('loggedUser'))['name']
      }

      const newBlogs = blogs.map(blog => blog.id === newBlog.id ? newBlog : blog)
      setBlogs(newBlogs.sort((a,b) => b.likes - a.likes))
    }
    catch(error) {
      setType('error')
      setMsg(error.response.data.error)
      setTimeout(() => setMsg(null), 5000)
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

    <div style={blogStyle}>
      <div>
        {blog.title} {blog.author} <button onClick={handleView}>{buttonLabel}</button>
      </div>

      <div style={showWhenVisible}>
        {blog.url}
        <div>likes {blog.likes} <button onClick={handleLike}>like</button></div>
        {blog.user.name}
        {blog.user.id === JSON.parse(window.localStorage.getItem('loggedUser'))['id'] ?
          <div><button onClick={() => handleDelete()}>remove</button></div> : null}

      </div>

    </div>
  )}

export default Blog