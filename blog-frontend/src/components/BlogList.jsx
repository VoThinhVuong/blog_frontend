import React from 'react'
import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { deleteBlog, likeBlog } from '../reducers/blogReducer'
import { showError, showSuccess } from '../reducers/notificationReducer'

const Blog = ({ blog, user, handleLike, handleDelete }) => {
    const [visible,setVisible] = useState(false)

    const blogStyle = {
        paddingTop: 10,
        paddingLeft: 2,
        border: 'solid',
        borderWidth: 1,
        marginBottom: 5
    }

    const buttonLabel = visible ? 'hide' : 'view'
    const showWhenVisible = { display: visible ? '' : 'none' }

    const handleView = () => {
        setVisible(!visible)
    }



    return(

        <div style={blogStyle} className='Blog'>
            <div>
                {blog.title} {blog.author} <button onClick={handleView} className='button'>{buttonLabel}</button>
            </div>

            <div style={showWhenVisible} className='toggableContent'>
                {blog.url}
                <div>likes {blog.likes} <button onClick={() => handleLike(blog)}>like</button></div>
                {blog.user.name}
                {blog.user.username === user.username ?
                    <div><button onClick={() => handleDelete(blog)}>remove</button></div> : null}

            </div>

        </div>
    )}

const BlogList = () => {

    const blogs = useSelector(({ blogs }) => {
        return [...blogs].sort((a, b) => b.likes - a.likes)
    })

    const user = useSelector(({ user }) => user)

    const dispatch = useDispatch()

    const handleLike = async (blog) => {
        try{
            await dispatch(likeBlog(blog))
        }
        catch(exception) {
            dispatch(showError(exception.response.data.error))
        }
    }

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
            {blogs.map(blog => <Blog key={blog.id} user={user} blog={blog} handleLike={handleLike} handleDelete={handleDelete}/>)}
        </div>
    )
}

export default BlogList