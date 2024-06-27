import React from "react";
import { useFormik } from "formik";
import { useHistory, useLocation } from 'react-router-dom';

function DeleteCourse({courses, setCourses}) {
    const location = useLocation()
    const url = location.pathname
    const parts = url.split("/")
    const id = parts[3]
    const history = useHistory()

    const formik = useFormik({
        initialValues: {
          id: id
        },
        onSubmit: (values) => {
        fetch(`http://127.0.0.1:5555/courses/${id}`, {
            method: "DELETE",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(values, null, 2)
        })
        .then(res => {
            if (res.status === 204) {
                return { message: 'record successfully deleted' };
              } else {
                return res.json();
              }
        })
        .then(data => {console.log(data)
            const newCourseList = courses.filter((course ) => {
                return course.id !== parseInt(id)
            })
        setCourses([...newCourseList])
        alert('Course successfully deleted')
        history.push('/courses')
        })
        .catch(error => {
            console.error('Error updating course:', error)
            
        })
    }
})
    return (
        <div>
            <form onSubmit={formik.handleSubmit}>
                <h1>Click the button below to delete the entire class record</h1>
                <h2>Warning: This action can not be undone!</h2>
                <button type='submit'>Click to delete class</button>
            </form>
        </div>
    )
}

export default DeleteCourse