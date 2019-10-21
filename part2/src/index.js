import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'  // highlight-line

const persons = [
  { 
    name: 'Arto Hellas',
    id: 0
  }
]
ReactDOM.render(
  <App persons={persons}/>,
  document.getElementById('root')
)