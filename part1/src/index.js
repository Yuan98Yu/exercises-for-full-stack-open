import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const Title = ({str}) => {
  return (
    <h1>{str}</h1>
  )
}

const Button = ({str, clickHandler}) => {
  return (
    <button onClick={clickHandler}>
      {str}
    </button>
  )
}

const NumDisplay = ({name, count}) => {
  return (
    <p>
      {name} {count}
    </p>
  )
}

const App = () => {
  // save clicks of each button to own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  const increaseCount = (count, setCount) => () => setCount(count + 1) 

  return (
    <>
      <div>
      <Title str='give feedback' />
        <Button str='good' clickHandler={increaseCount(good, setGood)} />
        <Button str='neutral' clickHandler={increaseCount(neutral, setNeutral)} />
        <Button str='bad' clickHandler={increaseCount(bad, setBad)} />
      </div>
      <div>
        <Title str='statistics' />
        <NumDisplay name='good' count={good} />
        <NumDisplay name='neutral' count={neutral} />
        <NumDisplay name='bad' count={bad} />
      </div>
    </>
  )
}

ReactDOM.render(<App />, 
  document.getElementById('root')
)