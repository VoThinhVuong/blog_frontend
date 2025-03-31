import { useEffect, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { initBlogs } from './reducers/blogReducer'
import { userLogout, setUser  } from './reducers/userReducer'
import blogService from './services/blogs'
import LoginForm from './components/LoginForm'
import RegisterForm from './components/RegisterForm'
import Notification from './components/Notification'
import BlogList from './components/BlogList'
import { Route, Routes, useMatch } from 'react-router-dom'
import Navigation from './components/Navigation'
import UserList from './components/UserList'
import User from './components/User'
import Blog from './components/Blog'
import './index.css'

const App = () => {

    const user = useSelector(({ user }) => user)
    const blogs = useSelector(({ blogs }) => blogs)
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(initBlogs())
    }, [dispatch])

    useEffect(() => {
        const loggedUser = window.localStorage.getItem('loggedUser')
        if (loggedUser) {
            const user = JSON.parse(loggedUser)
            dispatch(setUser(user))
            blogService.setToken(user.token)
        }
    }, [dispatch])

    const handleLogout = () => {
        dispatch(userLogout())
    }


    const blogMatch = useMatch('/blogs/:id')
    const matchedBlog = blogMatch ? blogs.find(blog => blog.id === blogMatch.params.id) : null


    return (
        <div>
            <Navigation />

            {
                user ?
                    <div>{user.username} logged in <button name='logout' onClick={handleLogout}>logout</button></div>
                    :   null
            }

            <Notification/>

            <Routes>
                <Route path='/' element={<BlogList blogs={blogs}/>} />
                <Route path='/register' element={<RegisterForm />} />
                <Route path='/login' element={<LoginForm />} />
                <Route path='/users' element={<UserList />} />
                <Route path='/users/:id' element={<User currUser={user} blogs={blogs}/>} />
                <Route path='/blogs/:id' element={<Blog blog={matchedBlog}/>} />
            </Routes>

        </div>
    )
}

export default App