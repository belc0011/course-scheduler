import React, { useEffect, useState } from "react";
import { useHistory, useLocation } from 'react-router-dom'
import * as yup from "yup";
import { useFormik } from "formik";

function CoursePage({courses, setCourses}) {
    const location = useLocation()
    const url = location.pathname
    const parts = url.split("/")
    const id = parts[2]
    const history = useHistory()
    const [courseToDisplay, setCourseToDisplay] = useState({})

    useEffect(() => {
        fetch(`http://127.0.0.1:5555/courses/${id}`, {
        method: "GET",
        })
        .then(res => {
            if (res.ok) {
                res.json().then(data => {
                    setCourseToDisplay(data)
                console.log(data)})
            }
            else {
                console.log("error: " + res)
            }
        })
        .catch(error => {
            console.error("Error parsing JSON:", error);
        })
    }, [])

    const formSchema = yup.object().shape({
        name: yup
        .string()
        .nullable()
        .matches(/^[a-zA-Z0-9. ]+$/, "Course name can only contain alphanumeric characters or a period"),
        credits: yup
        .number()
        .min(1, "Course must be at least 1 credit")
        .max(5, "Course may not be more than 5 credits")
        .nullable(),
        studentName: yup
        .string()
        .nullable()
        .matches(/^[a-zA-Z. \-]+$/, "Student name can not contain numbers or special characters, except an apostrophe or hyphen"),
        teacherName: yup
        .string()
        .nullable()
        .matches(/^[a-zA-Z. \-]+$/, "Teacher name can not contain numbers or special characters, except an apostrophe or hyphen"),
      });

    const formik = useFormik({
        initialValues: {
          name: "",
          credits: "",
          studentName: "",
          teacherName: "",
        },
        validationSchema: formSchema,
        onSubmit: (values, { resetForm }) => {
            console.log("click")
          fetch(`http://127.0.0.1:5555/courses/${id}`, {
            method: "PATCH",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(values, null, 2),
        })
        .then(res => {
            if (res.ok) {
                res.json().then(
                    data => {console.log(data)
                        setCourses(courses.map(course => course.id === parseInt(id) ? data : course))
                resetForm()
                history.push('/courses')
            })
            }
            else {
                console.log("error: " + res)
            }
        });
    }
    });
    function handleClick(e) {
        history.push(`/courses/delete/${id}`)
    }

    return (
        <div>
        {courseToDisplay ? (
            <>
                <h1>{courseToDisplay.name}</h1>
                <h3>{courseToDisplay.credits} credits</h3>
                <form onSubmit={formik.handleSubmit}>
                    <h2>To edit the course information, enter the corrected info into the appropriate box below:</h2>
                    <label htmlFor="name">Course Name: </label>
                    <div>
                        <input 
                            type="text" 
                            id="name" 
                            name="name"
                            value={formik.values.name} 
                            onChange={formik.handleChange}
                        />
                    </div>
                    <label htmlFor="credits">Number of credits: </label>
                    <div>
                        <input 
                            type="text" 
                            id="credits" 
                            name="credits"
                            value={formik.values.credits} 
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}/>
                            {formik.touched.credits && formik.errors.credits ? (
                            <p style={{ color: "red" }}>{formik.errors.credits}</p>
                            ) : null}
                    </div>
                    <h2>To add an existing student to this course:</h2>
                    <label htmlFor="student-name">Existing Student First and Last Name: </label>
                    <div>
                        <input 
                            type="text" 
                            id="student-name" 
                            name="studentName"
                            value={formik.values.studentName} 
                            onChange={formik.handleChange}/>
                            {formik.touched.studentName && formik.errors.studentName ? (
                            <p style={{ color: "red" }}>{formik.errors.studentName}</p>
                            ) : null}
                    </div>
                    <h2>To add an existing teacher as the teacher of record for this course:</h2>
                    <label htmlFor="teacher-name">Existing Teacher First and Last Name: </label>
                    <div>
                        <input 
                            type="text" 
                            id="teacher-name" 
                            name="teacherName"
                            value={formik.values.teacherName} 
                            onChange={formik.handleChange}/>
                            {formik.touched.teacherName && formik.errors.teacherName ? (
                            <p style={{ color: "red" }}>{formik.errors.teacherName}</p>
                            ) : null}
                    </div>
                    <div>
                        <p></p>
                        <button type="submit">Submit</button>
                    </div>
                </form>
                <label>To delete the entire course record, click here</label>
                <button onClick={handleClick}>DELETE</button>
            </>
        ) : (
            <h1>Loading...</h1>
        )}
    </div>
    )
}

export default CoursePage