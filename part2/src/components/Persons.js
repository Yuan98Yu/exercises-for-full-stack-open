import React from 'react'
import Button from './Button'

const Person = ({ person, handleDelete }) => {
    return (
        <p>{person.name} {person.number} <Button name='delete' onClick={handleDelete(person)} /></p>
    )
}

const Persons = ({ persons, setPersons, handleDelete}) => {
    const getPersons = () => persons.map(person => <Person key={person.id} person={person} handleDelete={handleDelete}/>)


    return (
        <>
            {getPersons()}
        </>
    )
}

export default Persons