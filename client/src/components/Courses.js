import React, { useEffect, useState } from "react";
import CourseCard from './CourseCard'
import AddCourse from "./AddCourse";

function Courses({courses, setCourses}) {
    const [showElement, setShowElement] = useState(false)
    
    function handleClick(e) {
        setShowElement(prevState => !prevState)
    }
    return (
    <div>
        <label>Click here to add a new course:</label>
        <button onClick={handleClick}>New Course</button>
        { showElement ? (
        <>
            <AddCourse courses={courses} setCourses={setCourses}/>
        </>
    ) : null }
        <h1>Courses:</h1>
            <h3>Click on the name of a course to edit the course info</h3>
            {courses.length > 0 ? courses.map((course) => {
                return <CourseCard key={course.id} name={course.name} credits={course.credits} id={course.id}/>
            }) : <h1>Loading...</h1>}
    </div>
)
}

export default Courses