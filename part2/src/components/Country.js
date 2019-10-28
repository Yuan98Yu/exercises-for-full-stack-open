import React from 'react'
import Button from './Button'

const WarnAboutNum = () => <p>Too Many matches specify another filter</p>

const CountryList = ({countries, shows, setShows}) => {
    
    const handleClickShow = countryName => () => {
        let clone = new Map(shows)
        let isShow = shows.get(countryName)
        clone.set(countryName, !isShow)
        setShows(clone)
        console.log(shows)
    }
    const getCountryList = () => 
        countries.map( 
            country => <li key={country.name}>
                            {country.name} <Button name={shows.get(country.name)?'hide':'show'} onClick={handleClickShow(country.name)}/>
                            {shows.get(country.name)?<CountryInfo country={country} />:<></>}
                        </li> 
        )

    return (
        <ul>
            {getCountryList()}
        </ul>
    )
}

const CountryInfo = ({country}) => {
    const getLanguages = () => country.languages.map( (language, index) => <li key={index}>{language.name}</li>)
    return (
        <>
            <h1>{country.name}</h1>
            <div>
                <p>capital {country.capital}</p>
                <p>polulation {country.population}</p>
            </div>
            <h2>language</h2>
            <ul>
                {getLanguages()}
            </ul>
        </>
    )
}

export default CountryList
export {CountryInfo, WarnAboutNum}