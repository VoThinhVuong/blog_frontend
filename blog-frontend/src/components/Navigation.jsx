import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'

const Navigation = () => {
    const user = useSelector(({ user }) => user)

    const styles = {
        display: 'flex',
        flexDirection: 'row',
        gap: '5px'
    }

    return(
        <div style={styles}>
            <Link to='/'>Home</Link>
            <Link to='/users'>Users</Link>
            {user ? <Link to={`/users/${user.id}`}>{user.name}</Link> : <Link to='/login'>Login</Link>}
            {user ? null : <Link to='/register'>Register</Link>}
        </div>
    )
}

export default Navigation