import React from 'react'
import { Link } from 'react-router-dom'
import { useRef } from 'react'
import BlogForm from './BlogForm'
import Togglable from './Toggable'

const BlogList = ({ blogs }) => {
    const blogFormRef = useRef()

    if(blogs.length === 0) return null

    const toggleVisibility = () => blogFormRef.current.toggleVisibility()

    const blogStyle = {
        paddingTop: 10,
        paddingLeft: 2,
        border: 'solid',
        borderWidth: 1,
        marginBottom: 5
    }

    const Blogs = [...blogs].sort((a, b) => b.likes - a.likes)

    return(
        <div>
            <Togglable buttonLabel={'create new blog'} ref={blogFormRef}>
                <BlogForm toggleVisibility={toggleVisibility}/>
            </Togglable>
            <h2>blogs</h2>
            {Blogs.map(blog => <div key={blog.id} style={blogStyle}><Link to={`/blogs/${blog.id}`}>{blog.title}</Link></div>)}
        </div>
    )
}

export default BlogList