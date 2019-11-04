import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'  // highlight-line
import personsService from './service/persons'

personsService
.getAll()
.then(response => {
  const persons = response.data
  ReactDOM.render(
    <App persons={persons} />,
    document.getElementById('root')
  )
})