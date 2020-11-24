import React from 'react'
import View from './View'

const Results = ({ countries }) => {
    if (countries.length > 1) {
        if (countries.length > 10) return <p>Too many hits, please be more specific.</p>
        return countries.map((country) => <p key={country.name}>{country.name}</p>)
    } else if (countries.length === 1) {
        return <View country={countries[0]} />
    } else return <p></p>
}

export default Results