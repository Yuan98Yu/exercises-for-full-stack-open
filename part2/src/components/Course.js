import React from 'react'

const Statistic = ({course}) => {
    const get_total = () => course.parts.reduce( (sum, part) => {
        return sum + part.exercises
    }, 0)

    return (
        <p><b>
            total of {get_total()} exercises
        </b></p>
    )
}

const Course = ({course}) => {
    const get_parts = () => course.parts.map( part =>
        <p key={part.id}>
            {part.name} {part.exercises}
        </p>
    )

    return (
        <>
        <h1>{course.name}</h1>
        {get_parts()}
        <Statistic course={course} />
        </>
    )
}

export default Course