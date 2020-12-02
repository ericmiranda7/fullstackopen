import React from 'react'

const Notification = ({ message }) => {
    if (!message) return null
    else {
        const msgStyles = {
            color: message.class ? 'red' : 'green',
            paddingTop: '5px',
            fontSize: '15px'
        }

        return (
            <div style={msgStyles}>
                {message.message}
            </div>
        )
    }
}

export default Notification
