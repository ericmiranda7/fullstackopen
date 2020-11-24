import React, { useState } from 'react'
import Display from './components/Display'
import Form from './components/Form'
import Search from './components/Search'

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