import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import './index.css';

const Button = ({ handleClick, text }) =>
  <button onClick={handleClick}>{text}</button>

const Display = ({ freq, text }) =>
  <p>{text} {freq}</p>

const App = () => {
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  const [total, setTotal] = useState(0)

  const incrGood = () => {
    setGood(good + 1)
    setTotal(total + 1)
  }
  const incrNeutral = () => {
    setNeutral(neutral + 1)
    setTotal(total + 1)
  }
  const incrBad = () => {
    setBad(bad + 1)
    setTotal(total + 1)
  }

  const calcAverage = () => (good - bad) / total || '0'
  const calcPositiveFeedback = () => good / total * 100 || '0'

  return (
    <div>
      <h1>How was the food ?</h1>
      <Button handleClick={incrGood} text="Good" />
      <Button handleClick={incrNeutral} text="Neutral" />
      <Button handleClick={incrBad} text="Bad" />
      <h1>Statistics</h1>
      <Display freq={good} text="Good" />
      <Display freq={neutral} text="Neutral" />
      <Display freq={bad} text="Bad" />
      <Display freq={total} text="All" />
      <Display freq={calcAverage()} text="Average" />
      <Display freq={calcPositiveFeedback() + ' %'} text="Positive" />
    </div >
  )
}

ReactDOM.render(
  <App />,
  document.getElementById('root')
);