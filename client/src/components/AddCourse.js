import React, { useEffect, useState } from "react";
import { useFormik } from "formik";
import * as yup from "yup";
import { useHistory } from 'react-router-dom';
import Home from './Home'

function AddCourse() {
    const [newCourse, setNewCourse] = useState({})
    const history = useHistory()

    const formSchema = yup.object().shape({
        name: yup
        .string()
        .matches(/^[a-zA-Z0-9. ]+$/, "Course name can only contain alphanumeric characters or a period")
        .required("Course name is required"),
        credits: yup
        .number()
        .min(1, "Course must be at least 1 credit")
        .max(5, "Course may not be more than 5 credits")
        .required("Number of credits is required"),
      });

    const formik = useFormik({
        initialValues: {
          name: "",
          credits: 0,
        },
        validationSchema: formSchema,
        onSubmit: (values, { resetForm }) => {
          fetch("http://127.0.0.1:5555/courses", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(values, null, 2),
        })
        .then(res => {
            if (res.ok) {
                res.json().then(
                    data => {setNewCourse(data)
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
            <form onSubmit={formik.handleSubmit}>
                <label htmlFor="name">Course Name: </label>
                <div>
                    <input type="text" 
                    id="name" 
                    name="name"
                    value={formik.values.name} 
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}/>
                    {formik.touched.name && formik.errors.name ? (
                    <p style={{ color: "red" }}>{formik.errors.name}</p>
                    ) : null}
                </div>
                <label htmlFor="credits">Number of credits: </label>
                    <div>
                        <select type="dropdown" 
                        name="credits"
                        id="credits" 
                        value={formik.values.credits} 
                        onChange={formik.handleChange}>
                            <option value="default">Select One</option>
                            <option value="1">1</option>
                            <option value="2">2</option>
                            <option value="3">3</option>
                            <option value="4">4</option>
                            <option value="5">5</option>
                        </select>
                    </div>
                <div>
                    <p></p>
                    <button type="submit">Submit</button>
                </div>
            </form>
        </div>
    )
}
export default AddCourse