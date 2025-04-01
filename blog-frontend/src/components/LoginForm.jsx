import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { showError } from '../reducers/notificationReducer'
import { userLogin } from '../reducers/userReducer'
import { Link, useNavigate } from 'react-router-dom'
import { Box, Button, Container, FormControl, Input, Typography } from '@mui/material'

const LoginForm = () => {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')

    const dispatch = useDispatch()

    const navigate = useNavigate()

    const handleLogin = async (event) => {
        event.preventDefault()

        try {
            await dispatch(userLogin( username, password))
            setUsername('')
            setPassword('')
            navigate('/')
        }
        catch(error) {
            dispatch(showError(error.response.data.error))
        }
    }

    return (
        <Container sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <Typography variant='h2'>log in to application</Typography>
            <form onSubmit={handleLogin} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <Box>
                    <Typography>username: </Typography>
                    <input data-testid="Username" value={username} onChange={({ target }) => setUsername(target.value)} type='text' name='Username' />
                </Box>
                <Box>
                    <Typography>password: </Typography>
                    <input data-testid="Password" value={password} onChange={({ target }) => setPassword(target.value)} type='password' name='Password' />
                </Box>
                <Button type='Submit' sx={{ margin: '5px' }} >login</Button>
            </form >
            <Box>Register a new account <Link to='/register'>here</Link></Box>
        </Container>
    )
}

export default LoginForm