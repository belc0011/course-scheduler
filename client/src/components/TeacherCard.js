import React, { useEffect, useState } from "react";

function TeacherCard( {lastName, firstName, id} ) {
    return (
        <div className= 'card'>
            <a href={`/teachers/${id}`}> {firstName} {lastName}</a>
        </div>
    )
}

export default TeacherCard