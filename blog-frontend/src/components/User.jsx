import { Link, useParams } from 'react-router-dom'
import { deleteBlog } from '../reducers/blogReducer'
import { showError, showSuccess } from '../reducers/notificationReducer'
import { useDispatch } from 'react-redux'

const User = ({ currUser, blogs }) => {

    const dispatch = useDispatch()

    const id = useParams().id

    const Blogs = blogs.filter(blog => blog.user.id === id)

    const name = Blogs[0].user.name

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