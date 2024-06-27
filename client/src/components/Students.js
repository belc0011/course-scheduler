import React, { useEffect, useState } from "react";
import StudentCard from './StudentCard'
import AddStudent from "./AddStudent";

function Students({ students, setStudents}) {
    const [showAddStudent, setShowAddStudent] = useState(false)

    function handleClick(e) {
        setShowAddStudent(prevState => !prevState)
    }
    return (
        <div>
            <label>Click here to add a new student:</label>
                <button onClick={handleClick}>New Student</button>
                { showAddStudent ? (
                <>
                    <AddStudent students={students} setStudents={setStudents}/>
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