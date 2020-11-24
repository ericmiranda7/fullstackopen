import React, { useState, useEffect } from 'react'
import axios from 'axios'

const View = ({ country }) => {

    const api_key = process.env.REACT_APP_API_KEY

    const [weatherData, setWeatherData] = useState({})
    const [loaded, setLoaded] = useState(false)

    useEffect(
        () => {
            console.log(`http://api.weatherapi.com/v1/current.json?key=${api_key}&q=${country.capital}`);
            axios
                .get(`http://api.weatherapi.com/v1/current.json?key=${api_key}&q=${country.capital}`)
                .then(response => {
                    setWeatherData(response.data)
                    setLoaded(true)
                })
        }
        , [api_key, country.capital])

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
            {
                loaded ?
                    <div>
                        <h2>Weather in {country.capital}</h2>
                        <p>Temperature: {weatherData.current.temp_c}</p>
                        <img src={weatherData.current.condition.icon} alt="Weather icon"></img>
                        <p>Wind direction: {weatherData.current.wind_dir} speed: {weatherData.current.wind_kph}</p>
                    </div> :
                    ''
            }
        </div>
    )
}

export default View