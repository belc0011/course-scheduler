import React from "react";

function CourseCard({name, credits, id}) {
    return (
        <div className='card'>
                <a href={`/courses/${id}`}>{name}</a>
                <h3>{credits} credits</h3>
        </div>
    )
}
export default CourseCard
