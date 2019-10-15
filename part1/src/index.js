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

const NumDisplay = ({name, num}) => {
  return (
    <p>
      {name} {num}
    </p>
  )
}

const Statistics = ({numList}) => {
  return (
    <>
      <Title str='statistics' />
      {
        numList.map(element => 
            <NumDisplay name={element.name} num={element.num} key={element.name} />
        )
      }
    </>
  )
}

const App = () => {
  // save clicks of each button to own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  const increaseNum = (num, setNum) => () => setNum(num + 1) 

  let statisticsList = [
    {name:'all', num:good+neutral+bad},
    {name:'average', num:(good-bad) / (good+neutral+bad)},
    {name:'positive', num: good / (good+neutral+bad)}
  ]

  return (
    <>
      <div>
      <Title str='give feedback' />
        <Button str='good' clickHandler={increaseNum(good, setGood)} />
        <Button str='neutral' clickHandler={increaseNum(neutral, setNeutral)} />
        <Button str='bad' clickHandler={increaseNum(bad, setBad)} />
      </div>
      <div>
        <Statistics numList={statisticsList} />
      </div>
    </>
  )
}

ReactDOM.render(<App />, 
  document.getElementById('root')
)