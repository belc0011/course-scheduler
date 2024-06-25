import React, { useEffect, useState } from "react";
import { useHistory, useLocation } from 'react-router-dom'

function TeacherPage({teachers}) {
    const [teacherToDisplay, setTeacherToDisplay] = useState({})
    
    const location = useLocation()
    const url = location.pathname
    const parts = url.split("/")
    const id = parts[2]
    
    useEffect(() => {
        fetch(`http://127.0.0.1:5555/teachers/${id}`, {
        method: "GET",
        })
        .then(res => {
            if (res.ok) {
                res.json().then(data => setTeacherToDisplay(data))
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
        {teacherToDisplay ? (
            <>
                <h1>{teacherToDisplay.first_name} {teacherToDisplay.last_name}</h1>
                <h2>Currently teaching the following courses:</h2>
                <h3>(Click on the course for further course details)</h3>
                {teacherToDisplay.courses ? teacherToDisplay.courses.map((course) => {
                    return <div key={course.id}>
                        <a href={`/courses/${course.id}`}>{course.name}</a>
                        </div>
                }) : (<h3>No courses to display</h3>)}
            </>
        ) : (<h1>Loading...</h1>)}
    </div>
    )
}

export default TeacherPage