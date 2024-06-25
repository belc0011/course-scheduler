import React, { useEffect, useState } from "react";
import TeacherCard from './TeacherCard'

function Teachers() {
    const [teachers, setTeachers] = useState([])

    useEffect(() => {
        fetch(`http://127.0.0.1:5555/teachers`, {
        method: "GET",
        })
        .then(res => {
            if (res.ok) {
                res.json().then(data => setTeachers(data))
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
        <h1>Teachers:</h1>
        <h3>Click on a teacher's name to pull up more information</h3>
        {teachers.length > 0 ? teachers.map((teacher) => {
            return <TeacherCard key={teacher.id} lastName={teacher.last_name} firstName={teacher.first_name} id={teacher.id}/>
        }) : <h1>Loading...</h1>}
    </div>
    )
}

export default Teachers