import React from 'react'

const Header = ({ text }) => <h1>{text}</h1>

const Part = ({ text, value }) => <p>{text} {value}</p>

const Content = ({ parts }) => {
    const total = parts.reduce((sum, part) => part.exercises + sum, 0)

    return (
        <div>
            {parts.map((part) => <Part key={part.id} text={part.name} value={part.exercises} />)}
            <Part text="Total of " value={total}/>
        </div>
    )
}

const Course = ({ course }) => {
    return (
        <div>
            <Header text={course.name} />
            <Content parts={course.parts} />
        </div>
    )
}

export default Course