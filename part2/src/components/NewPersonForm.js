import React from 'react'

const NewPersonForm = ({newName, newNumber, addNewPerson, changeNewName, changeNewNumber}) => {
  return (
    <form onSubmit={addNewPerson}>
      <div>
        name: <input value={newName} onChange={changeNewName} />
      </div>
      <div>
        number: <input value={newNumber} onChange={changeNewNumber} />
      </div>
      <div>
        <button type="submit">add</button>
      </div>
    </form>
  )
}

export default NewPersonForm