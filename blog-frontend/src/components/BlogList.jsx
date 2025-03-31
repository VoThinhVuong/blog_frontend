import React from 'react'
import { Link } from 'react-router-dom'


const BlogList = ({ blogs }) => {
    if(blogs.length === 0) return null

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
            {Blogs.map(blog => <div key={blog.id} style={blogStyle}><Link to={`/blogs/${blog.id}`}>{blog.title}</Link></div>)}
        </div>
    )
}

export default BlogList