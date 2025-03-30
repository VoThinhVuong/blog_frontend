import { Link } from 'react-router-dom'

const UserList = ({ blogs }) => {

    const data = {}

    for (let blog of blogs){
        if(!data[blog.user.name])
            data[blog.user.name] = []
        data[blog.user.name] = data[blog.user.name].concat(blog)
    }

    return(
        <div>
            <h2>Users</h2>
            <table>
                <thead>
                    <tr>
                        <th><strong>usernames</strong></th>
                        <th><strong>blogs created</strong></th>
                    </tr>
                </thead>
                <tbody>
                    {Object.entries(data).map(([name, blogs]) => <tr key={name}>
                        <td><Link to={blogs[0].user.id}>{name}</Link></td>
                        <td>{blogs.length}</td>
                    </tr>
                    )}
                </tbody>
            </table>
        </div>
    )
}

export default UserList