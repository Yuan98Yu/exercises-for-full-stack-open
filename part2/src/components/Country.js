import React from 'react'

const WarnAboutNum = () => <p>Too Many matches specify another filter</p>

const CountryList = ({countries}) => {
    const getCountryList = () => countries.map( country => <p key={country.id}> {country.name}</p> )

    return (
        <>
            {getCountryList()}
        </>
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