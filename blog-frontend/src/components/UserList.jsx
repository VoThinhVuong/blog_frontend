import { Link } from 'react-router-dom'
import { useState, useEffect } from 'react'
import { showError } from '../reducers/notificationReducer'
import { useDispatch } from 'react-redux'
import userService from '../services/users'

const UserList = () => {
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

    if(!users || users.length === 0) return null

    return(
        <div>
            <h2>Users</h2>
            <table>
                <thead>
                    <tr>
                        <th><strong>names</strong></th>
                        <th><strong>blogs created</strong></th>
                    </tr>
                </thead>
                <tbody>
                    {users.map(user =>
                        <tr key={user.id}><td><Link to={`/users/${user.id}`}>{ user.name }</Link></td> <td>{ user.blogs.length }</td></tr>
                    )}
                </tbody>
            </table>
        </div>
    )
}

export default UserList