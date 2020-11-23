import React from 'react'
import Course from './components/Course'

const App = ({ courses }) => {
    return (
        courses.map(
            (course) => <Course course={course} />
        )
    )
}

export default App
