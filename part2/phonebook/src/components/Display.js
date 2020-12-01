import React from 'react'

const Person = ({ name, number, deletePerson}) => {
    return (
        <div>
            <p>
                {name} {number} 
                <button onClick={deletePerson}>delete</button>
            </p>
        </div>
    )
}

const Display = ({ persons, handleClick }) => {
    return (
        <div>
            <h2>Persons</h2>
            { persons.map(person => <Person key={person.id} name={person.name} number={person.number} deletePerson={() => handleClick(person)} />)}
        </div>
    )
}

export default Display