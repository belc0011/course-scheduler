import React, { useEffect, useState } from "react";
import TeacherCard from './TeacherCard'
import AddTeacher from "./AddTeacher";

function Teachers({teachers, setTeachers}) {
    const [addTeacher, showAddTeacher] = useState(false)

    function handleClick(e) {
        showAddTeacher(prevState => !prevState)
    }
    return (
    <div>
        <label>Click here to add a new teacher:</label>
                <button onClick={handleClick}>New Teacher</button>
                { addTeacher ? (
                <>
                    <AddTeacher teachers={teachers} setTeachers={setTeachers}/>
                </>
            ) : null }
        <h1>Teachers:</h1>
        <h3>Click on a teacher's name to pull up more information</h3>
        {teachers.length > 0 ? teachers.map((teacher) => {
            return <TeacherCard key={teacher.id} lastName={teacher.last_name} firstName={teacher.first_name} id={teacher.id}/>
        }) : <h1>Loading...</h1>}
    </div>
    )
}

export default Teachers