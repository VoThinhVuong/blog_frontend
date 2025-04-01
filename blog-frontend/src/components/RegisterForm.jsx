import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { showError, showSuccess } from '../reducers/notificationReducer'
import { useNavigate, Link } from 'react-router-dom'
import userService from '../services/users'
import { Box, Button, Container, Typography } from '@mui/material'

const RegisterForm = () => {
    const [username, setUsername] = useState('')
    const [name, setName] = useState('')
    const [password, setPassword] = useState('')

    const dispatch = useDispatch()

    const navigate = useNavigate()

    const handleRegister = async (event) => {
        event.preventDefault()

        try {
            await userService.register({ username, name, password })
            setUsername('')
            setPassword('')
            setName('')
            navigate('/login')
            dispatch(showSuccess('Account created! please login'))
        }
        catch(error) {
            dispatch(showError(error.response.data.error))
        }
    }

    return (
        <Container sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <Typography variant='h2'>Register an account</Typography>
            <form onSubmit={handleRegister} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <Box>
                    <Typography>username: </Typography>
                    <input data-testid="Username" value={username} onChange={({ target }) => setUsername(target.value)} type='text' name='Username'></input>
                </Box>
                <Box>
                    <Typography>name: </Typography>
                    <input data-testid="Name" value={name} onChange={({ target }) => setName(target.value)} type='text' name='Name'></input>
                </Box>
                <Box>
                    <Typography>password: </Typography>
                    <input data-testid="Password" value={password} onChange={({ target }) => setPassword(target.value)} type='password' name='Password'></input>
                </Box>
                <Button type='Submit'>Create account</Button>
            </form>
            <div>Already have an account ? Login <Link to='/register'>here</Link></div>
        </Container>
    )
}

export default RegisterForm