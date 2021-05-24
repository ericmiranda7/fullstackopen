import React, { useState, useImperativeHandle } from 'react'

const Togglable = React.forwardRef((props, ref) => {
  const [isVisible, setIsVisible] = useState(false)

  useImperativeHandle(ref, () => {
    return {toggleVisibility}
  })

  const toggleVisibility = () => setIsVisible(!isVisible)
  
  return (
    <div>
      <button style={{ display: isVisible ? 'none' : '' }} onClick={toggleVisibility}>{props.buttonText}</button>
      <div style={{ display: isVisible ? '' : 'none' }}>
        {props.children}
        <button onClick={toggleVisibility}>Cancel</button>
      </div>
    </div>
  )
})

export default Togglable