import React, { useEffect, useState } from "react";
import StudentCard from './StudentCard'
import AddStudent from "./AddStudent";

function Students() {
    const [students, setStudents] = useState([])
    const [showAddStudent, setShowAddStudent] = useState(false)

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

    function handleClick(e) {
        setShowAddStudent(prevState => !prevState)
    }
    return (
        <div>
            <label>Click here to add a new student:</label>
                <button onClick={handleClick}>New Student</button>
                { showAddStudent ? (
                <>
                    <AddStudent />
                </>
            ) : null }
            <h1>Students:</h1>
            <h3>Click on a student's name to pull up more information</h3>
            {students ? students.map((student) => {
                return <StudentCard key={student.id} lastName={student.last_name} firstName={student.first_name} id={student.id}/>
            }) : <h1>Loading...</h1>}
        </div>
    )
}

export default Students