import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import './index.css';

const Button = ({ handleClick, text }) =>
  <button onClick={handleClick}>{text}</button>

const Statistic = ({ freq, text }) => {
  return (
    <tr>
      <td>{text}</td>
      <td>{freq}</td>
    </tr>
  )
}

const Statistics = ({ good, neutral, bad, total, calcAverage, calcPositiveFeedback }) => {
  if (total) {
    return (
      <div>
        <h1>Statistics</h1>
        <table>
          <tbody>
            <Statistic freq={good} text="Good" />
            <Statistic freq={neutral} text="Neutral" />
            <Statistic freq={bad} text="Bad" />
            <Statistic freq={total} text="All" />
            <Statistic freq={calcAverage()} text="Average" />
            <Statistic freq={calcPositiveFeedback() + ' %'} text="Positive" />
          </tbody>
        </table>
      </div>
    )
  } else return (
    <div>
      <h1>Statistics</h1> <p>No feedback given</p>
    </div>
  )
}

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

  const calcAverage = () => (good - bad) / total
  const calcPositiveFeedback = () => good / total * 100

  const returnTags =
    <div>
      <h1>How was the food ?</h1>
      <Button handleClick={incrGood} text="Good" />
      <Button handleClick={incrNeutral} text="Neutral" />
      <Button handleClick={incrBad} text="Bad" />
      <Statistics good={good} neutral={neutral} bad={bad} total={total} calcAverage={calcAverage} calcPositiveFeedback={calcPositiveFeedback} />
    </div >

  return returnTags;
}

ReactDOM.render(
  <App />,
  document.getElementById('root')
);