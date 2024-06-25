import React, { useEffect, useState } from "react";

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
        {teachers.length > 0 ? teachers.map((teacher) => {
            return <h1 key={teacher.id}>{teacher.last_name}, {teacher.first_name}</h1>
        }) : <h1>Loading...</h1>}
    </div>
    )
}

export default Teachers