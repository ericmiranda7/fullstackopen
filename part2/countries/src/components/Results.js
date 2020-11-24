import React, { useState } from 'react'
import View from './View'

const Result = ({ country }) => {

    const [showView, setShowView] = useState(false)

    const handleClick = () => setShowView(!showView)

    return (
        <div>
            {country.name} <button onClick={handleClick}>Show</button>
            { showView ? <View country={country} /> : ''}
        </div>
    )
}

const Results = ({ countries }) => {

    if (countries.length === 1) {
        return <View country={countries[0]} />
    } else if (countries.length < 11) {
        return (
            countries.map(
                (country) => <Result key={country.name} country={country} />
            )
        )
    } else return <p>Please be more specific with your search</p>
}

export default Results