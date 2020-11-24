import React, {useState, useEffect} from 'react';
import './App.css';
import axios from 'axios'
import Search from './components/Search'
import Results from './components/Results'

const App = () => {

  const [countries, setCountries] = useState([])
  const [searchCountry, setSearchCountry] = useState('')
  const [filterCountries, setFilterCountries] = useState(false)

  useEffect(
    () => axios
    .get('https://restcountries.eu/rest/v2/all')
    .then(response => setCountries(response.data))
  , [])

  const handleSearchChange = (event) => {
    setSearchCountry(event.target.value.toLowerCase())
    setFilterCountries(Boolean(event.target.value))
  }

  const countriesToShow = filterCountries ?
  countries.filter(country => country.name.toLowerCase().includes(searchCountry)) :
  []


  return (
    <div>
      <h1>Find country</h1>
      <Search handleSearchChange={handleSearchChange}/>
      <h1>Results</h1>
      {
        countriesToShow ?
        <Results countries={countriesToShow} /> :
        ''
      }
    </div>
  )
}

export default App;
