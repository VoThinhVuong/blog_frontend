import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { showError } from '../reducers/notificationReducer'
import { userLogin } from '../reducers/userReducer'
import { useNavigate } from 'react-router-dom'

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
        <div>
            <h1>log in to application</h1>
            <form onSubmit={handleLogin}>
                <div>
                    username
                    <input data-testid="Username" value={username} onChange={({ target }) => setUsername(target.value)} type='text' name='Username'></input>
                </div>
                <div>
                    password
                    <input data-testid="Password" value={password} onChange={({ target }) => setPassword(target.value)} type='password' name='Password'></input>
                </div>
                <input type='Submit' value="login"/>
            </form>
        </div>
    )
}

export default LoginForm