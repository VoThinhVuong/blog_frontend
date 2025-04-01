import { Alert } from '@mui/material'
import React from 'react'
import { useSelector } from 'react-redux'

const Notification = () => {
    const message = useSelector(({ notification }) => notification)

    if(message === null)
        return null
    else{
        return(
            <Alert severity={message.type} sx={{ margin: '10px' }}>
                {message.content}
            </Alert >
        )
    }
}

export default Notification