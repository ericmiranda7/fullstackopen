import React from 'react'

const View = ({ country }) => {
    if (country) {
        return (
            <div>
                <h1>{country.name}</h1>
                <p>Capital {country.capital}</p>
                <p>Population {country.population}</p>
                <h2>Languages</h2>
                <ul>
                    {country.languages.map(language => <li key={language.name}> {language.name} </li>)}
                </ul>
                <img src={country.flag} height="150" width="150" alt="Country flag"></img>
            </div>
        )
    } else return ''
}

export default View