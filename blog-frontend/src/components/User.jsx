import { Link, useParams } from 'react-router-dom'
import { deleteBlog } from '../reducers/blogReducer'
import { showError, showSuccess } from '../reducers/notificationReducer'
import { useDispatch } from 'react-redux'
import { useState, useEffect } from 'react'
import userService from '../services/users'

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

    const Blogs = blogs.filter(blog => blog.user.id === id)

    const name = user.name

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
        <div>
            <h2>{ name }</h2>
            <strong>added blogs</strong>
            <div>None</div>
        </div>
    )

    return(
        <div>
            <h2>{ name }</h2>
            <strong>added blogs</strong>
            <ul>
                { Blogs.map(blog =>
                    <li key={blog.id}>
                        <Link to={`/blogs/${blog.id}`}>{blog.title}</Link>
                        {currUser && blog.user.id === currUser.id ?
                            <div><button onClick={() => handleDelete(blog)}>remove</button></div>
                            : null}
                    </li>
                )}
            </ul>
        </div>
    )
}

export default User