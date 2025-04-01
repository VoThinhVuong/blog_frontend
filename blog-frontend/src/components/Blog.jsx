import { useDispatch } from 'react-redux'
import { likeBlog, commentBlog } from '../reducers/blogReducer'
import { showError } from '../reducers/notificationReducer'
import { useState } from 'react'
import { Box, Button, Container, Input, Link, Typography } from '@mui/material'

const Blog = ({ blog }) => {
    const [ comment, setComment ] = useState('')

    const dispatch = useDispatch()

    const handleComment = async (e) => {
        e.preventDefault()
        const newBlog = { ...blog, comments: blog.comments.concat(comment) }
        try{
            await dispatch(commentBlog(newBlog))
            setComment('')
        } catch(e) {
            dispatch(showError(e.response.data.error))
        }
    }



    const handleLike = async (blog) => {
        try{
            await dispatch(likeBlog(blog))
        }
        catch(exception) {
            dispatch(showError(exception.response.data.error))
        }
    }

    if(!blog) return null

    return(

        <Container className='Blog' sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <Typography variant='h2' sx={{ margin: '10px ' }}>{blog.title}</Typography>
            <Typography sx={{ margin: '10px ' }}>full blog at: <Link href={blog.url} target='_blank' rel='noreferrer'>{blog.url}</Link></Typography>
            <Typography sx={{ margin: '10px ' }}>{blog.likes} likes <Button variant="outlined" onClick={() => handleLike(blog)}>like</Button ></Typography>
            <Typography sx={{ margin: '10px ' }}>added by {blog.user.name}</Typography>

            <Typography variant='h3' sx={{ margin: '10px ' }}>comments (anonymous)</Typography>

            <form onSubmit={handleComment}>
                <Input type='text' value={comment} onChange={(e) => setComment(e.target.value)} />
                <Input type='submit' value='add comment' />
            </form>

            <ul>
                {blog.length !== 0 ? blog.comments.map(comment => <li key={comment}><Typography>{comment}</Typography></li>) : null}
            </ul>
        </Container>
    )
}

export default Blog