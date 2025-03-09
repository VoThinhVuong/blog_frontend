import axios from 'axios'
const baseUrl = '/api/blogs'

let token = null

const setToken = newToken => token = `Bearer ${newToken}`

const getAll = async () => {
  const request = await axios.get(baseUrl)
  return request.data
}

const postBlog = async (newBlog) => {

  const config = {
    headers: { Authorization: token },
  }

  const response = await axios.post(baseUrl, newBlog, config)
  return response.data
}

const likeBlog = async (blog) => {
  const config = {
    headers: { Authorization: token },
  }

  const response = await axios.put(`${baseUrl}/${blog.id}`, blog, config)
  return response.data
}

const deleteBlog = async (id) => {
  const config = {
    headers: { Authorization: token },
  }

  const response = await axios.delete(`${baseUrl}/${id}`, config)
  return response.data
}

export default { getAll, setToken, postBlog, likeBlog, deleteBlog }