import React from 'react'

const Notification = ({ message }) => {
    if (!message) return null
    else {
        return (
            <div className="error">
                {message}
            </div>
        )
    }
}

export default Notification
