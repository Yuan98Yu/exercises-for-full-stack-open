import React, { useState, useEffect } from 'react'
import axios from 'axios'
import FilterInput from './components/FilterInput'
import NewPersonForm from './components/NewPersonForm'
import Persons from './components/Persons'

const App = () => {
    const [ persons, setPersons] = useState([]) 
    const [ newName, setNewName ] = useState('')
    const [ newNumber, setNewNumber] = useState('')
    const [filter, setFilter] = useState('')
    useEffect(() => {
        console.log('effect')
        axios
          .get('http://localhost:3001/persons')
          .then(response => {
            console.log('promise fulfilled')
            console.log(response.data)
            setPersons(response.data)
          })
      }, [])

    const changeNewName = (event) => {
        setNewName(event.target.value)
    }
    const changeNewNumber = (event) => {
        setNewNumber(event.target.value)
    }
    const changeFilter = (event) => {
        setFilter(event.target.value)
    }
    const addNewPerson = (event) => {
        event.preventDefault()
        if ( persons.map(person => person.name).includes(newName) ) {
            alert(`${newName} is already added to phonebook`)
        }
        else {
            const personObject = {
                name: newName,
                number: newNumber,
                id: persons.length
            }
            setPersons(persons.concat(personObject) )
            setNewName('')
            setNewNumber('')
        }
    }

    const personsToShow = () => persons.filter( person => person.name.includes(filter) )

    return (
    <div>
        <h2>Phonebook</h2>
        <FilterInput filter={filter} changeFilter={changeFilter} />
        <h2>Add a New</h2>
        <NewPersonForm newName={newName} newNumber={newNumber} changeNewName={changeNewName} 
        changeNewNumber={changeNewNumber} addNewPerson={addNewPerson} />
        <h2>Numbers</h2>
        <Persons persons={personsToShow()} />
    </div>
    )
}

export default App