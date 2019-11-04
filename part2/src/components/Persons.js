import React from 'react'

const Person = ({person}) => {
  return (
    <p>{person.name} {person.number}</p>
  )
}

const Persons = ({persons}) => {
    const getPersons = () => persons.map( person => <Person key={person.id} person={person} />)

    return (
        <>
        {getPersons()}
        </>
    )
}

export default Persons