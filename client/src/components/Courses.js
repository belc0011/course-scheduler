import React, { useEffect, useState } from "react";

function Courses({courses, setCourses}) {
    
    return (
    <div>
        {courses ? courses.map((course) => {
            return (<div key={course.id}>
                <h1>{course.name}</h1>
                <h3>{course.credits}</h3>
            </div>)
        }) : (<h1>Loading...</h1>)}
    </div>
)
}

export default Courses