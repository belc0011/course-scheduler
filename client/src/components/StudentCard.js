import React from "react";

function StudentCard({firstName, lastName, id}) {
    return (
        <div className= 'card'>
            <a href={`/students/${id}`}> {firstName} {lastName}</a>
        </div>
    )
}

export default StudentCard