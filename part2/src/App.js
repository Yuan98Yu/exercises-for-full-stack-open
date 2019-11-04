import React, { useState } from 'react'
import Persons from './components/Persons'
import NewPersonForm from './components/NewPersonForm'
import FilterInput from './components/FilterInput'

import personsService from './service/persons'

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
    const curPerson = persons.find( person => person.name === newName)
    const personObject = {
      name: newName,
      number: newNumber
    }
    if ( curPerson ) {
      if (window.confirm(`${curPerson.name} is already added phone book, replace the old number with a new one?`) ) {
        personObject.id = curPerson.id
        personsService
          .update(curPerson.id, personObject)
          .then( () => {
            const newPersons = persons.map(person => person.id === curPerson.id ? personObject : person)
            setPersons(newPersons)
          })
          .catch(error => alert(error))
      }
    }
    else {
      personsService
      .create(personObject)
      .then(response => {
        console.log(response)
        setPersons(persons.concat(response.data))
        setNewName('')
        setNewNumber('')
      })
      .catch( error => alert(error))
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
      <Persons persons={personsToShow()} setPersons={setPersons}/>
    </div>
  )
}

export default App