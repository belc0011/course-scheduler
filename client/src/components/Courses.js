import React, { useEffect, useState } from "react";
import CourseCard from './CourseCard'

function Courses() {
    const [courses, setCourses] = useState([])

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

    return (
    <div>
        <h1>Courses:</h1>
        <h3>Click on the name of a course to pull up more information</h3>
        {courses.length > 0 ? courses.map((course) => {
            return <CourseCard key={course.id} name={course.name} credits={course.credits} id={course.id}/>
        }) : <h1>Loading...</h1>}
    </div>
)
}

export default Courses