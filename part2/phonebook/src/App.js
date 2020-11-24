import React, { useState } from 'react'

const Person = ({ name, number }) => <p>{name} {number}</p>

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456' },
    { name: 'Ada Lovelace', number: '39-44-5323523' },
    { name: 'Dan Abramov', number: '12-43-234345' },
    { name: 'Mary Poppendieck', number: '39-23-6423122' }
  ])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [searchName, setSearchName] = useState('')
  const [showAll, setShowAll] = useState(true)


  const handleNameChange = event => setNewName(event.target.value)

  const handleNumberChange = event => setNewNumber(event.target.value)

  const handleSearchChange = event => {
    setSearchName(event.target.value)
    event.target.value ?
      setShowAll(false) :
      setShowAll(true)
  }

  const handleClick = (event) => {
    event.preventDefault()
    const newPerson = {
      name: newName,
      number: newNumber,
    }
    persons.find(person => person.name === newName) ?
      alert(`${newName} is already added to phonebook`) :
      setPersons(persons.concat(newPerson))
  }



  const personsToShow = showAll ?
    persons :
    persons.filter(person => person.name.toLowerCase().includes(searchName))

  return (
    <div>
      <h1>Phonebook</h1>
      <h2>Search</h2>
      Filter names with <input value={searchName} onChange={handleSearchChange} />
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
      <h2>Numbers</h2>
      {personsToShow.map(person => <Person key={person.name} name={person.name} number={person.number} />)}
    </div>
  )
}

export default App