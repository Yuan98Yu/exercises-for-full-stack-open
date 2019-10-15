import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const Title = ({text}) => {
  return (
    <h1>{text}</h1>
  )
}

const Button = ({text, clickHandler}) => {
  return (
    <button onClick={clickHandler}>
      {text}
    </button>
  )
}

const Buttons = ({buttonList}) => {
  return (
    <>
      <Title text='give feedback' />
      {
        buttonList.map( element =>
          <Button key={element.text} text={element.text} clickHandler={element.clickHandler} />
        )
      }
    </>
  )
}

const Statistics = ({numList}) => {
  return (
    <>
      <Title text='statistics' />
      <table>
        <tbody>
        {
          numList.map(element => 
            <tr key={element.text} > 
              <td>{element.text}</td>
              <td>{element.num}</td>
            </tr>
          )
        }
      </tbody>
      </table>
    </>
  )
}

const App = () => {
  // save clicks of each button to own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  const increaseNum = (num, setNum) => () => setNum(num + 1) 

  let buttonList = [
    {text:'good', clickHandler:increaseNum(good, setGood) },
    {text:'neutral', clickHandler:increaseNum(neutral, setNeutral) },
    {text:'bad', clickHandler:increaseNum(bad, setBad) },
  ]
  let statisticList = [
    {text:'good', num:good},
    {text:'neutral', num:neutral},
    {text: 'bad', num:bad},
    {text:'all', num:good+neutral+bad},
    {text:'average', num:(good-bad) / (good+neutral+bad)},
    {text:'positive', num: good / (good+neutral+bad)}
  ]

  let statistics = good+neutral+bad === 0 ? 
    <p>"No feedback given"</p> : 
    <Statistics numList={statisticList} />


  return (
    <>
      <div>
        <Buttons buttonList={buttonList} />
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