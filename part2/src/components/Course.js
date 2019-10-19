import React from 'react'

const Course = ({course}) => {
    const details = () => course.parts.map( part =>
        <p key={part.id}>
            {part.name} {part.exercises}
        </p>
    )

    return (
        <>
        <h1>{course.name}</h1>
        {details()}
        </>
    )
}

export default Course