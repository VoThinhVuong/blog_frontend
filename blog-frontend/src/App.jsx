import { useEffect, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { initBlogs } from './reducers/blogReducer'
import { userLogout, setUser  } from './reducers/userReducer'
import blogService from './services/blogs'
import LoginForm from './components/LoginForm'
import BlogForm from './components/BlogForm'
import Notification from './components/Notification'
import Togglable from './components/Toggable'
import BlogList from './components/BlogList'
import './index.css'

const App = () => {

    const user = useSelector(({ user }) => user)
    const blogFormRef = useRef()
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(initBlogs())
    }, [])

    useEffect(() => {
        const loggedUser = window.localStorage.getItem('loggedUser')
        console.log(loggedUser)
        if (loggedUser) {
            const user = JSON.parse(loggedUser)
            dispatch(setUser(user))
            blogService.setToken(user.token)
        }
    }, [])

    console.log(user)

    const handleLogout = () => {
        dispatch(userLogout())
    }

    if(user === null){
        return(
            <>
                <h1>log in to application</h1>
                <LoginForm />
                <Notification />
            </>
        )}

    const toggleVisibility = () => blogFormRef.current.toggleVisibility()

    return (
        <div>


            {user.username} logged in <button name='logout' onClick={handleLogout}>logout</button>

            <h2>blogs</h2>

            <Notification/>

            <Togglable buttonLabel={'create new blog'} ref={blogFormRef}>
                <BlogForm toggleVisibility={toggleVisibility}/>
            </Togglable>

            <BlogList user={user}/>


        </div>
    )
}

export default App