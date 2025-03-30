import { useDispatch } from 'react-redux'
import { likeBlog } from '../reducers/blogReducer'
import { showError } from '../reducers/notificationReducer'

const Blog = ({ blog }) => {

    const dispatch = useDispatch()

    const handleLike = async (blog) => {
        try{
            await dispatch(likeBlog(blog))
        }
        catch(exception) {
            dispatch(showError(exception.response.data.error))
        }
    }


    return(

        <div className='Blog'>
            <h2>{blog.title}</h2>
            <a href={blog.url}>{blog.url}</a>
            <div>{blog.likes} likes <button onClick={() => handleLike(blog)}>like</button></div>
            <div>added by {blog.user.name}</div>
        </div>
    )
}

export default Blog