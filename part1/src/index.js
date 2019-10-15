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

const Statistic = ({text, num}) => {
  return (
    <p>
      {text} {num}
    </p>
  )
}

const Statistics = ({numList}) => {
  return (
    <>
      <Title str='statistics' />
      {
        numList.map(element => 
            <Statistic text={element.text} num={element.num} key={element.text} />
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

  let statisticList = [
    {text:'good', num:good},
    {text:'neutral', num:neutral},
    {text: 'bad', num:bad},
    {text:'all', num:good+neutral+bad},
    {text:'average', num:(good-bad) / (good+neutral+bad)},
    {text:'positive', num: good / (good+neutral+bad)}
  ]

  let statistics = good+neutral+bad==0 ? 
    <p>"No feedback given"</p> : 
    <Statistics numList={statisticList} />


  return (
    <>
      <div>
      <Title str='give feedback' />
        <Button str='good' clickHandler={increaseNum(good, setGood)} />
        <Button str='neutral' clickHandler={increaseNum(neutral, setNeutral)} />
        <Button str='bad' clickHandler={increaseNum(bad, setBad)} />
      </div>
      <div>        
        {statistics}
      </div>
    </>
  )
}

ReactDOM.render(<App />, 
  document.getElementById('root')
)