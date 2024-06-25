import React, { useEffect, useState } from "react";
import TeacherCard from './TeacherCard'

function Teachers({teachers, setTeachers}) {
    
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