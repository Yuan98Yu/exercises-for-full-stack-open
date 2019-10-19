import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const Button = ({text, handleClick}) => {
  return (
    <button onClick={handleClick}>
      {text}
    </button>
  )
}

const App = ({anecdotes}) => {
  const [selected, setSelected] = useState(0)
  const [points, setPoints] = useState( Array(anecdotes.length).fill(0) )
  const vote = () => {
    const copy = [...points]
    copy[selected] += 1
    setPoints(copy)
  }
  const rdSelect = () => {
    let next
    do {
      next = Math.floor(Math.random()*anecdotes.length)
    } while (next === selected)
    setSelected (next)
  }  

  return (
    <>
      <div>
        <h1>Anecdote of the day</h1>
        <p>{anecdotes[selected]}</p>
        <p>has {points[selected]} votes</p>
        <Button text="votes"
          handleClick={vote} />
        <Button text="next anecdote" 
          handleClick={rdSelect} />
      </div>
      <div>
        <h1>Anecdote with most votes</h1>
        <p>{anecdotes[ points.indexOf( Math.max.apply(Math, points) ) ]}</p>
        <p>has {Math.max.apply(Math, points)} votes</p>
      </div>

    </>
  )
}

const anecdotes = [
  'If it hurts, do it more often',
  'Adding manpower to a late software project makes it later!',
  'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
  'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
  'Premature optimization is the root of all evil.',
  'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
]




ReactDOM.render(
  <App anecdotes={anecdotes} />,
  document.getElementById('root')
)