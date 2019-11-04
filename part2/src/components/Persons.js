import React from 'react'
import Button from './Button'
import personsService from '../service/persons'

const Person = ({ person, handleDelete }) => {
    return (
        <p>{person.name} {person.number} <Button name='delete' onClick={handleDelete(person)} /></p>
    )
}

const Persons = ({ persons, setPersons }) => {
    const handleDelete = person => () => {
        if (window.confirm(`delete ${person.name}?`)) {
            personsService
                .deleteItem(person.id)
                .then( response => {
                    console.log(response)
                    let newPersons = persons.filter( oldPerson => oldPerson.id !== person.id )
                    setPersons(newPersons)
                })
                .catch(error => alert(error))
        }
    }
    const getPersons = () => persons.map(person => <Person key={person.id} person={person} handleDelete={handleDelete}/>)


    return (
        <>
            {getPersons()}
        </>
    )
}

export default Persons