import React, { useEffect, useState } from "react";
import { useHistory, useLocation } from 'react-router-dom'
import * as yup from "yup";
import { useFormik } from "formik";

function CoursePage() {
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
      });

    const formik = useFormik({
        initialValues: {
          name: "",
          credits: "",
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
                resetForm()
                history.push('/courses') //fix - page doesn't refresh
            })
            }
            else {
                console.log("error: " + res)
            }
        });
    }
    });

    return (
        <div>
        {courseToDisplay ? (
            <>
                <h1>{courseToDisplay.name}</h1>
                <form onSubmit={formik.handleSubmit}>
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
                    <div>
                        <p></p>
                        <button type="submit">Submit</button>
                    </div>
                </form>
            </>
        ) : (
            <h1>Loading...</h1>
        )}
    </div>
    )
}

export default CoursePage