import React, { useState } from 'react'
import Persons from './components/Persons'
import NewPersonForm from './components/NewPersonForm'
import FilterInput from './components/FilterInput'
import Notification from './components/Notification'

import personsService from './service/persons'

const App = (props) => {
    const [persons, setPersons] = useState(props.persons)
    const [newName, setNewName] = useState('')
    const [newNumber, setNewNumber] = useState('')
    const [filter, setFilter] = useState('')
    const [errorMessage, setErrorMessage] = useState(null)
    const showNotification = (message, time=8000) => {
        setErrorMessage(message)
        setTimeout(() => {
            setErrorMessage(null)
        }, time)
    }
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
        const curPerson = persons.find(person => person.name === newName)
        const personObject = {
            name: newName,
            number: newNumber
        }
        if (curPerson) {
            if (window.confirm(`${curPerson.name} is already added phone book, replace the old number with a new one?`)) {
                personObject.id = curPerson.id
                personsService
                    .update(curPerson.id, personObject)
                    .then(() => {
                        const newPersons = persons.map(person => person.id === curPerson.id ? personObject : person)
                        setPersons(newPersons)
                        showNotification(`Changed ${personObject.name}'s number from ${curPerson.number} to ${personObject.number}`)
                    })
                    .catch(error =>  {
                        console.log(error)
                        setErrorMessage(error.response.data.error)
                    })
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
                    showNotification(`Added ${personObject.name}`)
                })
                .catch(error =>  {
                    console.log(error.response.data)
                    setErrorMessage(error.response.data.error)
                })
        }
    }
    const deletePerson = person => () => {
        if (window.confirm(`delete ${person.name}?`)) {
            personsService
                .deleteItem(person.id)
                .then( response => {
                    console.log(response)
                    let newPersons = persons.filter( oldPerson => oldPerson.id !== person.id )
                    setPersons(newPersons)
                    showNotification(`Delete information of ${person.name} succeeded`)
                })
                .catch(
                    showNotification(`Information of ${person.name} has already been removed from server`)
                )
        }
    }

    const personsToShow = () => persons.filter(person => person.name.includes(filter))

    return (
        <div>
            <h2>Phonebook</h2>
            <Notification message={errorMessage} />
            <FilterInput filter={filter} changeFilter={changeFilter} />
            <h2>Add a New</h2>
            <NewPersonForm newName={newName} newNumber={newNumber} changeNewName={changeNewName}
                changeNewNumber={changeNewNumber} addNewPerson={addNewPerson} />
            <h2>Numbers</h2>
            <Persons persons={personsToShow()} setPersons={setPersons} handleDelete={deletePerson}/>
        </div>
    )
}

export default App