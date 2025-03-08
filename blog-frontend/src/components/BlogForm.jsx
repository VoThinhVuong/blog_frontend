import React, {useState} from 'react'
import blogService from '../services/blogs'

const BlogForm = ({blogs, setBlogs, setMsg, setType}) => {
    const [author, setAuthor] = useState('')
    const [title, setTitle] = useState('')
    const [url, setUrl] = useState('')


    const handleBlog = async (event) =>{
        event.preventDefault()
        try{
            const newBlog = await blogService.postBlog({author,title, url})
            //console.log(newBlog)
            const newBlogs = blogs.concat(newBlog)
            //console.log(newBlogs)
            setAuthor('')
            setTitle('')
            setUrl('')
            setBlogs(newBlogs)

            setType('succ')
            setMsg(`a new blog '${newBlog.title}' by ${newBlog.author} added`)
            setTimeout(() => setMsg(null), 5000)
        }
        catch(error) {
            setType('error')
            setMsg(error.response.data.error)
            setTimeout(() => setMsg(null), 5000)
        }
    }



    return (
    <form onSubmit={handleBlog}>
        <div>title:</div> <input value={title} onChange={({target}) => setTitle(target.value)}></input>
        <div>author:</div> <input value={author} onChange={({target}) => setAuthor(target.value)}></input>
        <div>url:</div> <input value={url} onChange={({target}) => setUrl(target.value)}></input>
        <input type='Submit' value='create'></input>
    </form>
    )
}

export default BlogForm