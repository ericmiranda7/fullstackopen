import React from 'react'

const Header = ({ text }) => <h1>{text}</h1>

const Part = ({text, value}) => <p>{text} {value}</p>

const Content = ({ part }) => {
    return (
        part.map((part) => <Part key={part.id} text={part.name} value={part.exercises}/>)
    )
}

const Course = ({course}) => {
    return (
        <div>
            <Header text={course.name} />
            <Content part={course.parts} />
        </div>
    )
}

export default Course