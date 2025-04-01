import React from 'react'
import { useState, forwardRef, useImperativeHandle } from 'react'
import PropTypes from 'prop-types'
import { Button } from '@mui/material'

const Togglable = forwardRef(({ buttonLabel, exitLabel='cancel', children }, refs) => {
    const [visible, setVisible] = useState(false)

    const hideWhenVisible = { display: visible ? 'none' : '' }
    const showWhenVisible = { display: visible ? 'flex' : 'none' }

    const toggleVisibility = () => {
        setVisible(!visible)
    }

    useImperativeHandle(refs, () => {
        return {
            toggleVisibility
        }
    })

    return(
        <div>
            <div style={hideWhenVisible}>
                <Button onClick={toggleVisibility} sx={{ margin: '10px' }}>{buttonLabel}</Button>
            </div>
            <div style={{ ...showWhenVisible, flexDirection: 'column', alignItems: 'center' }}>
                {children}
                <Button onClick={toggleVisibility}  sx={{ margin: '10px' }}>{exitLabel}</Button>
            </div>
        </div>
    )
})

Togglable.displayName = 'Togglable'

Togglable.propTypes = {
    buttonLabel: PropTypes.string.isRequired
}

export default Togglable