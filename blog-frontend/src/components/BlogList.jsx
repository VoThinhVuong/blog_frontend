import React from 'react'
import { Link } from 'react-router-dom'
import { useRef } from 'react'
import BlogForm from './BlogForm'
import Togglable from './Toggable'
import { Container, Paper, Typography } from '@mui/material'

const BlogList = ({ blogs }) => {
    const blogFormRef = useRef()

    if(blogs.length === 0) return null

    const toggleVisibility = () => blogFormRef.current.toggleVisibility()



    const Blogs = [...blogs].sort((a, b) => b.likes - a.likes)

    return(
        <Container sx={{ justifyItems: 'center', alignItems: 'center' }}>
            <Typography variant='h1' sx={{ margin: '10px' }}>blogs</Typography>
            <Togglable buttonLabel={'create new blog'} ref={blogFormRef}>
                <BlogForm toggleVisibility={toggleVisibility}/>
            </Togglable>
            {Blogs.map(blog =>
                <Paper key={blog.id} elevation={3} sx={{ ':hover': { transform: 'scale(1.05)', transition: '0.2s' } ,margin: '20px', display: 'flex' ,width: '80%', justifyContent: 'center', alignItems: 'center', height: 30 }}>
                    <Link to={`/blogs/${blog.id}`} style={{ width: '80%', display: 'flex', justifyContent: 'space-between' }}>
                        <Typography sx={{ color: 'primary.main' }}>{blog.title}</Typography>
                        <Typography sx={{ color: 'primary.main' }}>by {blog.author}</Typography>
                    </Link>
                </Paper>)}
        </Container>
    )
}

export default BlogList