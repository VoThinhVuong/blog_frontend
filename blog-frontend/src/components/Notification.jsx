import React from 'react'
import { useSelector } from 'react-redux'

const Notification = () => {
    const message = useSelector(({ notification }) => notification)

    if(message === null)
        return null
    else{
        return(
            <div className={message.type}>
                {message.content}
            </div>
        )
    }
}

export default Notification