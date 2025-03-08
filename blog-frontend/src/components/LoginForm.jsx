import React from 'react'
import loginService from '../services/login'
import blogService from '../services/blogs'

const LoginForm = ({username, setUsername, password, setPassword, setUser, setType, setMsg}) => {


    const handleLogin = async (event) => {
        event.preventDefault()

        try {
            const user = await loginService.login({
                username,
                password
            })

            window.localStorage.setItem('loggedUser', JSON.stringify(user))

            blogService.setToken(user.token)
            setUsername('')
            setPassword('')
            setUser(user)
            
        }
        catch(error) {
            setType('error')
            setMsg(error.response.data.error)
            setTimeout(() => setMsg(null), 5000)
        }
    }

  return (
    <form onSubmit={handleLogin}>
        <div>username</div>
        <input value={username} onChange={({target}) => setUsername(target.value)} type='text' name='Username'></input>
        <div>password</div>
        <input value={password} onChange={({target}) => setPassword(target.value)} type='password' name='Password'></input>
        <input type='Submit' value="login"/>
    </form>
  )
}

export default LoginForm