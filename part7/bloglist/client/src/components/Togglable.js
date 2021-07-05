import React, { useState, useImperativeHandle } from 'react'
import PropTypes from 'prop-types'
import { Button } from 'react-bootstrap'

const Togglable = React.forwardRef((props, ref) => {
  const [isVisible, setIsVisible] = useState(false)

  useImperativeHandle(ref, () => {
    return { toggleVisibility }
  })

  const toggleVisibility = () => setIsVisible(!isVisible)
  return (
    <div>
      <Button style={{ display: isVisible ? 'none' : '' }} onClick={toggleVisibility}>{props.buttonText}</Button>
      <div className="container pt-1" style={{ display: isVisible ? '' : 'none', border: '2px solid' }}>
        {props.children}
        <Button className="mb-2" onClick={toggleVisibility}>Cancel</Button>
      </div>
    </div>
  )
})

Togglable.displayName = 'Togglable'
Togglable.propTypes = {
  buttonText: PropTypes.string.isRequired
}

export default Togglable