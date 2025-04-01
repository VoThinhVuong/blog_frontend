import { Link, useParams } from 'react-router-dom'
import { deleteBlog } from '../reducers/blogReducer'
import { showError, showSuccess } from '../reducers/notificationReducer'
import { useDispatch } from 'react-redux'
import { useState, useEffect } from 'react'
import userService from '../services/users'
import { Box, Button, Container, List, ListItem, Paper, Typography } from '@mui/material'

const User = ({ currUser, blogs }) => {

    const [ users, setUsers ] = useState([])

    const dispatch = useDispatch()

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const data = await userService.getAll() // Wait for the Promise to resolve
                setUsers(data) // Update state with the resolved data
            } catch (error) {
                dispatch(showError(error.response.data.error))
            }
        }

        fetchUsers()
    }, [])


    const id = useParams().id

    const user = users.filter(user => user.id === id)

    if(user.length === 0) return null

    const Blogs = blogs.filter(blog => blog.user.id === id)

    const handleDelete = async (blog) => {
        if(window.confirm(`Remove blog ${blog.title} by ${blog.author}?`)){
            try{
                await dispatch(deleteBlog(blog))
                dispatch(showSuccess(`Removed blog ${blog.title} by ${blog.author}`))
            }
            catch(exception) {
                dispatch(showError(exception.response.data.error))
            }
        }
    }

    if(Blogs.length === 0) return(
        <Container sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <Typography variant='h2'>{ user[0].name }</Typography>
            <Typography variant='h3'>added blogs</Typography>
            <Typography>None</Typography>
        </Container>
    )

    return(
        <Container sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <Typography variant='h2'>{ user[0].name }</Typography>
            <Typography variant='h3'>added blogs:</Typography>
            { Blogs.map(blog =>
                <Paper key={blog.id} elevation={3} sx={{ margin: '20px', display: 'flex' ,width: '80%', justifyContent: 'space-evenly', alignItems: 'center', height: 30 }}>
                    <Link to={`/blogs/${blog.id}`}>{blog.title}</Link>
                    {currUser && blog.user.id === currUser.id ?
                        <Box><Button onClick={() => handleDelete(blog)}>remove</Button></Box>
                        : null}
                </Paper >
            )}
        </Container>
    )
}

export default User