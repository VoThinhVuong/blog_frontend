import { useDispatch } from 'react-redux'
import { likeBlog, commentBlog } from '../reducers/blogReducer'
import { showError } from '../reducers/notificationReducer'
import { useState } from 'react'

const Blog = ({ blog }) => {
    const [ comment, setComment ] = useState('')

    const dispatch = useDispatch()

    const handleComment = async (e) => {
        e.preventDefault()
        const newBlog = { ...blog, comments: blog.comments.concat(comment) }
        try{
            await dispatch(commentBlog(newBlog))
            setComment('')
        } catch(e) {
            dispatch(showError(e.response.data.error))
        }
    }



    const handleLike = async (blog) => {
        try{
            await dispatch(likeBlog(blog))
        }
        catch(exception) {
            dispatch(showError(exception.response.data.error))
        }
    }

    if(!blog) return null

    return(

        <div className='Blog'>
            <h2>{blog.title}</h2>
            <a href={blog.url}>{blog.url}</a>
            <div>{blog.likes} likes <button onClick={() => handleLike(blog)}>like</button></div>
            <div>added by {blog.user.name}</div>

            <h3>comments</h3>

            <form onSubmit={handleComment}>
                <input type='text' onChange={(e) => setComment(e.target.value)} />
                <input type='submit' value='add comment' />
            </form>

            <ul>
                {blog.length !== 0 ? blog.comments.map(comment => <li key={comment}>{comment}</li>) : null}
            </ul>
        </div>
    )
}

export default Blog