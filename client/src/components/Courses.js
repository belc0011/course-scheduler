import React, { useEffect, useState } from "react";
import CourseCard from './CourseCard'

function Courses({courses, setCourses}) {
    console.log(courses)
    return (
    <div>
        <h1>Courses:</h1>
        <h3>Click on the name of a course to pull up more information</h3>
        {courses.length > 0 ? courses.map((course) => {
            return <CourseCard key={course.id} name={course.name} credits={course.credits} id={course.id}/>
        }) : <h1>Loading...</h1>}
    </div>
)
}

export default Courses