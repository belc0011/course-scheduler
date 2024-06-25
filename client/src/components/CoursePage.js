import React, { useEffect, useState } from "react";
import { useHistory, useLocation } from 'react-router-dom'

function CoursePage() {
    const location = useLocation()
    const url = location.pathname
    const parts = url.split("/")
    const id = parts[2]
    const [courseToDisplay, setCourseToDisplay] = useState({})

    useEffect(() => {
        fetch(`http://127.0.0.1:5555/courses/${id}`, {
        method: "GET",
        })
        .then(res => {
            if (res.ok) {
                res.json().then(data => {
                    setCourseToDisplay(data)
                console.log(data)})
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
        {courseToDisplay ? (
            <>
                <h1>{courseToDisplay.name}</h1>

            </>
        ) : (<h1>Loading...</h1>)}
    </div>
    )
}

export default CoursePage