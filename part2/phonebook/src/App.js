import React, { useState } from 'react'

const Person = ({ name }) => <p>{name}</p>

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas' }
  ])
  const [newName, setNewName] = useState('')
  const handleChange = (event) => {
    console.log(event.target.value)
    setNewName(event.target.value)
  }
  const handleClick = (event) => {
    event.preventDefault()
    setPersons(persons.concat({name: newName}))
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <form>
        <div>
          name: <input value={newName} onChange={handleChange} />
        </div>
        <div>
          <button type="submit" onClick={handleClick}>add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      {persons.map(person => <Person key={person.name} name={person.name} />)}
    </div>
  )
}

export default App