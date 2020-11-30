import React, { useState, useEffect } from 'react'
import Display from './components/Display'
import Form from './components/Form'
import Search from './components/Search'
import axios from 'axios'

const App = () => {
  
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [searchName, setSearchName] = useState('')
  const [showAll, setShowAll] = useState(true)

  useEffect(() =>
    axios
    .get('http://localhost:3001/persons')
    .then(response => setPersons(response.data))
  , [])

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
    persons.filter(person => person.name.toLowerCase().includes(searchName.toLowerCase()))

  return (
    <div>
      <h1>Phonebook</h1>
      <Search searchName={searchName} handleSearchChange={handleSearchChange} />
      <Form
        newName={newName}
        handleNameChange={handleNameChange}
        newNumber={newNumber}
        handleNumberChange={handleNumberChange}
        handleClick={handleClick}
      />
      <Display persons={personsToShow} />
    </div>
  )
}

export default App