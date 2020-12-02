import React, { useState, useEffect } from 'react'
import Display from './components/Display'
import Form from './components/Form'
import Search from './components/Search'
import personService from './services/personService'
import Notification from './components/Notif'

const App = () => {

  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [searchName, setSearchName] = useState('')
  const [showAll, setShowAll] = useState(true)
  const [notif, setNotif] = useState({})

  useEffect(() =>
    personService
      .getAll()
      .then(response => setPersons(response))
    , [])

  const notify = (message, msgClass) => {
    setNotif({ message, class: msgClass || 0 })
    setTimeout(
      () => setNotif(null), 5000
    )
  }

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

    const existingPerson = persons.find(person => person.name === newName)

    if (existingPerson) {
      let replace = window.confirm(`${newName} is already added to phonebook, replace with new number ?`)
      newPerson.id = existingPerson.id

      if (replace) {
        personService
        .updatePerson(existingPerson.id, newPerson)
        .then(response => setPersons(persons.map(person => {
          notify(`${newPerson.name}'s number was changed to ${newPerson.number}`)
          return person.id === response.id ? newPerson : person
        })))
        .catch(error => notify(`${existingPerson.name} has been deleted from the system`, 1))
      }
    } else {
      personService.create(newPerson).then(response => setPersons(persons.concat(response)))

      notify(`${newPerson.name} was added to the phonebook`)
    }
  }

  const deletePerson = (person) => {
    window.confirm(`Are you sure you want to delete ${person.name} ?`)
    personService
    .delPerson(person.id)
    .then(response => setPersons(persons.filter(p => p.id !== person.id)))

    notify(`${person.name} was removed from the phonebook.`)
  }



  const personsToShow = showAll ?
    persons :
    persons.filter(person => person.name.toLowerCase().includes(searchName.toLowerCase()))

  return (
    <div>
      <h1>Phonebook</h1>
      <Notification message={notif} />
      <Search searchName={searchName} handleSearchChange={handleSearchChange} />
      <Form
        newName={newName}
        handleNameChange={handleNameChange}
        newNumber={newNumber}
        handleNumberChange={handleNumberChange}
        handleClick={addPerson}
      />
      <Display persons={personsToShow} handleClick={deletePerson} />
    </div>
  )
}

export default App