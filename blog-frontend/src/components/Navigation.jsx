import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { Breadcrumbs, Typography, Button } from '@mui/material'
import { userLogout  } from '../reducers/userReducer'
import { useDispatch } from 'react-redux'

const Navigation = () => {
    const user = useSelector(({ user }) => user)

    const dispatch = useDispatch()

    const handleLogout = () => {
        dispatch(userLogout())
    }

    return(
        <Breadcrumbs sx={{
            display: 'flex',
            justifyItems: 'center',
            justifyContent: 'center',
            width: '100%',
            height: '30px',
            backgroundColor: 'secondary.main',
            color: 'white' }} separator='|'>

            <Link to='/'><Typography sx={{ color : 'white', ':hover': { transform: 'scale(1.25)', transition: '0.2s' } }}>Home</Typography></Link>
            <Link to='/users'> <Typography sx={{ color : 'white', ':hover': { transform: 'scale(1.25)', transition: '0.2s' } }}>Users</Typography></Link>
            {user ?
                <Link to={`/users/${user.id}`}>
                    <Typography sx={{ color : 'white', ':hover': { transform: 'scale(1.25)', transition: '0.2s' } }}>{user.name}</Typography>
                </Link>
                : <Link to='/login'> <Typography sx={{ color : 'white', ':hover': { transform: 'scale(1.25)', transition: '0.2s' } }}> Login </Typography></Link>}
            {user ? null : <Link to='/register'>
                <Typography sx={{ color : 'white', ':hover': { transform: 'scale(1.25)', transition: '0.2s' } }}>Register </Typography>
            </Link>}
            {
                user ?
                    <Link name='logout' onClick={handleLogout}>
                        <Typography sx={{ color : 'white', ':hover': { transform: 'scale(1.25)', transition: '0.2s' } }}>Logout</Typography>
                    </Link>
                    :   null
            }
        </Breadcrumbs>
    )
}

export default Navigation