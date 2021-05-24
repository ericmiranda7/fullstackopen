import React, { useState } from 'react'

const Togglable = props => {
  const [isVisible, setIsVisible] = useState(false)

  return (
    <div>
      <button style={{ display: isVisible ? 'none' : '' }} onClick={() => setIsVisible(true)}>{props.buttonText}</button>
      <div style={{ display: isVisible ? '' : 'none' }}>
        {props.children}
        <button onClick={() => setIsVisible(false)}>Cancel</button>
      </div>
    </div>
  )
}

export default Togglable