import React from 'react'

const Form = ({ newName, handleNameChange, newNumber, handleNumberChange, handleClick }) => {
    return (
        <div>
            <h2>Add new entry</h2>
            <form>
                <div>
                    name: <input value={newName} onChange={handleNameChange} />
                    number: <input value={newNumber} onChange={handleNumberChange} />
                </div>
                <div>
                    <button type="submit" onClick={handleClick}>add</button>
                </div>
            </form>
        </div>
    )
}

export default Form