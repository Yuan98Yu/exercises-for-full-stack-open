import React, { useState } from 'react'
import Persons from './components/Persons'

const App = (props) => {
  const [ persons, setPersons] = useState(props.persons) 
  const [ newName, setNewName ] = useState('')
  const changeNewName = (event) => {
    setNewName(event.target.value)
  }
  const addNewPerson = (event) => {
    event.preventDefault()
    if ( persons.map(person => person.name).includes(newName) ) {
      alert(`${newName} is already added to phonebook`)
    }
    else {
      const personObject = {
        name: newName,
        id: persons.length
      }
      setPersons(persons.concat(personObject) )
      setNewName('')
    }
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <form onSubmit={addNewPerson}>
        <div>
          name: <input value={newName} onChange={changeNewName} />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      <Persons persons={persons} />
    </div>
  )
}

export default App