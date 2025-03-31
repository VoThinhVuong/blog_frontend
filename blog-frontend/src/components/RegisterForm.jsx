import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { showError, showSuccess } from '../reducers/notificationReducer'
import { useNavigate, Link } from 'react-router-dom'
import userService from '../services/users'

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
        <div>
            <h1>Create an account</h1>
            <form onSubmit={handleRegister}>
                <div>
                    username
                    <input data-testid="Username" value={username} onChange={({ target }) => setUsername(target.value)} type='text' name='Username'></input>
                </div>
                <div>
                    name
                    <input data-testid="Name" value={name} onChange={({ target }) => setName(target.value)} type='text' name='Name'></input>
                </div>
                <div>
                    password
                    <input data-testid="Password" value={password} onChange={({ target }) => setPassword(target.value)} type='password' name='Password'></input>
                </div>
                <input type='Submit' value="login"/>
            </form>
            <div>Already have an account ? Login <Link to='/register'>here</Link></div>
        </div>
    )
}

export default RegisterForm