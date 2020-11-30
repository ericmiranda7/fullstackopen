import React, { useState, useEffect } from 'react'
import Display from './components/Display'
import Form from './components/Form'
import Search from './components/Search'
import personService from './services/personService'

const App = () => {

  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [searchName, setSearchName] = useState('')
  const [showAll, setShowAll] = useState(true)

  useEffect(() =>
    personService
      .getAll()
      .then(response => setPersons(response))
    , [])

  const handleNameChange = event => setNewName(event.target.value)

  const handleNumberChange = event => setNewNumber(event.target.value)

  const handleSearchChange = event => {
    setSearchName(event.target.value)
    event.target.value ?
      setShowAll(false) :
      setShowAll(true)
  }

  const addPerson = (event) => {
    event.preventDefault()

    const newPerson = {
      name: newName,
      number: newNumber,
    }

    if (persons.find(person => person.name === newName)) {
      alert(`${newName} is already added to phonebook`)
    } else {
      personService.create(newPerson).then(response => setPersons(persons.concat(response)))
    }
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
        handleClick={addPerson}
      />
      <Display persons={personsToShow} />
    </div>
  )
}

export default App