import { useState, useEffect, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { initBlogs } from './reducers/blogReducer'
import blogService from './services/blogs'
import LoginForm from './components/LoginForm'
import BlogForm from './components/BlogForm'
import Notification from './components/Notification'
import Togglable from './components/Toggable'
import BlogList from './components/BlogList'
import './index.css'

const App = () => {
    const [blogs, setBlogs] = useState([])
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [user, setUser] = useState(null)
    const [msg, setMsg] = useState(null)
    const [type, setType] = useState('error')

    const blogFormRef = useRef()
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(initBlogs())
    }, [])

    useEffect(() => {
        const loggedUser = window.localStorage.getItem('loggedUser')
        if (loggedUser) {
            const user = JSON.parse(loggedUser)
            setUser(user)
            blogService.setToken(user.token)
        }
    }, [])

    const handleLogout = () => {
        blogService.setToken(null)
        window.localStorage.removeItem('loggedUser')
        setUser(null)
    }

    if(user === null){
        return(
            <>
                <h1>log in to application</h1>
                <LoginForm
                    username={username}
                    setUsername={setUsername}
                    password={password}
                    setPassword={setPassword}
                    setUser={setUser}
                    setMsg={setMsg}
                    setType={setType}
                />
                <Notification message={msg} type={type} />
            </>
        )}

    const toggleVisibility = () => blogFormRef.current.toggleVisibility()

    return (
        <div>


            {user.username} logged in <button name='logout' onClick={handleLogout}>logout</button>

            <h2>blogs</h2>

            <Notification/>

            <Togglable buttonLabel={'create new blog'} ref={blogFormRef}>
                <BlogForm blogs={blogs} setBlogs={setBlogs} setMsg={setMsg} setType={setType} toggleVisibility={toggleVisibility}/>
            </Togglable>

            <BlogList user={user}/>


        </div>
    )
}

export default App