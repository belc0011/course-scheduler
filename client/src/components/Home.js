import React from "react";
import { useHistory } from 'react-router-dom'

function Home() {
    const history = useHistory()

    function handleClick(e) {
        history.push('/teachers')
    }

    function handleClick2(e) {
        history.push('/students')
    }

    function handleClick3(e) {
        history.push('/courses')
    }

    return(
    <>
        <h1>~Welcome to the course scheduler~</h1>
        <h2>Please choose one of the menu options below to get started</h2>
        <label>Course List: </label>
        <button onClick={handleClick3}>Click for Courses</button>
        <label>Teacher List: </label>
        <button onClick={handleClick}>Click for Teachers</button>
        <label>Student List: </label>
        <button onClick={handleClick2}>Click for Students</button>
    </>
    )
}

export default Home