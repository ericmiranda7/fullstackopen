import React from 'react'

const Person = ({ name, number }) => <p>{name} {number}</p>

const Display = ({ persons }) => {
    return (
        <div>
            <h2>Persons</h2>
            { persons.map(person => <Person key={person.name} name={person.name} number={person.number} />)}
        </div>
    )
}

export default Display