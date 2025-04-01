import { Link } from 'react-router-dom'
import { useState, useEffect } from 'react'
import { showError } from '../reducers/notificationReducer'
import { useDispatch } from 'react-redux'
import userService from '../services/users'
import { Container, Table, TableBody, TableCell, TableHead, TableRow, Typography } from '@mui/material'

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
        <Container sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <Typography variant='h1'>Users</Typography>
            <Table >
                <TableHead>
                    <TableRow>
                        <TableCell sx={{ textAlign: 'center' }}><strong><Typography>names</Typography></strong></TableCell>
                        <TableCell sx={{ textAlign: 'center' }}><strong><Typography>blogs created</Typography></strong></TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {users.map(user =>
                        <TableRow key={user.id}>
                            <TableCell sx={{ textAlign: 'center' }}><Link to={`/users/${user.id}`}>{ user.name }</Link></TableCell>
                            <TableCell sx={{ textAlign: 'center' }}>{ user.blogs.length }</TableCell>
                        </TableRow>
                    )}
                </TableBody>
            </Table>
        </Container>
    )
}

export default UserList