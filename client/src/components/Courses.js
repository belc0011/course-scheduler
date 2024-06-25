import React, { useEffect, useState } from "react";
import CourseCard from './CourseCard'
import AddCourse from "./AddCourse";

function Courses() {
    const [courses, setCourses] = useState([])
    const [showElement, setShowElement] = useState(false)

    useEffect(() => {
        fetch(`http://127.0.0.1:5555/courses`, {
        method: "GET",
        })
        .then(res => {
            if (res.ok) {
                res.json().then(data => setCourses(data))
            }
            else {
                console.log("error: " + res)
            }
        })
        .catch(error => {
            console.error("Error parsing JSON:", error);
        })
    }, [])

    function handleClick(e) {
        setShowElement(prevState => !prevState)
    }
    return (
    <div>
        <label>Click here to add a new course:</label>
        <button onClick={handleClick}>New Course</button>
        { showElement ? (
        <>
            <AddCourse />
        </>
    ) : null }
        <h1>Courses:</h1>
            <h3>Click on the name of a course to edit the course info</h3>
            {courses.length > 0 ? courses.map((course) => {
                return <CourseCard key={course.id} name={course.name} credits={course.credits} id={course.id}/>
            }) : <h1>Loading...</h1>}
        <label>Click here to add a new course:</label>
        <button onClick={handleClick}>New Course</button>
            <AddCourse />
    </div>
)
}

export default Courses