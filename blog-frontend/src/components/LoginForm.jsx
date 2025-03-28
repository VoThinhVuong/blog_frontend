import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { showError } from '../reducers/notificationReducer'
import { userLogin } from '../reducers/userReducer'

const LoginForm = () => {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')

    const dispatch = useDispatch()

    const handleLogin = async (event) => {
        event.preventDefault()

        try {
            await dispatch(userLogin( username, password))
            setUsername('')
            setPassword('')
        }
        catch(error) {
            dispatch(showError(error.response.data.error))
        }
    }

    return (
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
    )
}

export default LoginForm