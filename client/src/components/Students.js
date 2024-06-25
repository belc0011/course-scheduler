import React, { useEffect, useState } from "react";
import StudentCard from './StudentCard'

function Students() {
    const [students, setStudents] = useState([])

    useEffect(() => {
        fetch("http://127.0.0.1:5555/students", {
        method: "GET",
        })
        .then(res => {
            if (res.ok) {
                res.json().then(data => {
                    setStudents(data)
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
            <h1>Students:</h1>
            <h3>Click on a student's name to pull up more information</h3>
            {students ? students.map((student) => {
                return <StudentCard key={student.id} lastName={student.last_name} firstName={student.first_name} id={student.id}/>
            }) : <h1>Loading...</h1>}
        </div>
    )
}

export default Students