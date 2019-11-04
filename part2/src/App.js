import React, { useState } from 'react'
import Persons from './components/Persons'
import NewPersonForm from './components/NewPersonForm'
import FilterInput from './components/FilterInput'

import axios from 'axios'

const App = (props) => {
  const [ persons, setPersons] = useState(props.persons) 
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber] = useState('')
  const [filter, setFilter] = useState('')
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
        id: persons.length + 1
      }
      axios
      .post('http://localhost:3001/persons', personObject)
      .then(response => {
        console.log(response)
        setPersons(persons.concat(personObject) )
        setNewName('')
        setNewNumber('')
      })
      .catch( () => alert("fail to add new person"))
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