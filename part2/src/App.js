import React, { useState, useEffect } from 'react'
import axios from 'axios'
import FilterInput from './components/FilterInput'
import CountryList, {WarnAboutNum, CountryInfo} from './components/Country'

const App = () => {
    const [ countries, setCountries] = useState([])
    const [ shows, setShows] = useState([])
    const [ filter, setFilter] = useState('') 

    useEffect(() => {
        console.log('effect')
        axios
          .get(`https://restcountries.eu/rest/v2/name/${filter}`)
          .then(response => {
            console.log('promise fulfilled')
            console.log(response.data)
            setCountries(response.data)
            setShows(new Map( countries.map(country => [country.name, false]) ))
          })
      }, [filter])

    const changeFilter = (event) => {
        setFilter(event.target.value)
    }
    const getCountriesToShow = () => {
        if (countries.length === 1) {
            return (
                <CountryInfo country={countries[0]} />
            )
        }
        else if (countries.length < 10) {
            return (
                <CountryList countries={countries} shows={shows} setShows={setShows}/>
            )
        }
        else if(countries.length >= 10) {
            return (
                <WarnAboutNum />
            )
        }
    }

    return (
    <div>
        <FilterInput filter={filter} changeFilter={changeFilter} />
        {getCountriesToShow()}
    </div>
    )
}

export default App