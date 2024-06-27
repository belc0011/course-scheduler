import React, { useState } from "react";
import { useFormik } from "formik";
import * as yup from "yup";
import { useHistory } from 'react-router-dom';

function AddStudent({students, setStudents}) {
    const history = useHistory()

    const formSchema = yup.object().shape({
        firstName: yup
        .string()
        .matches(/^[a-zA-Z\']+$/, "First name can not contain numbers or special characters, except an apostrophe")
        .required("First name is required"),
        lastName: yup
        .string()
        .matches(/^[a-zA-Z\-]+$/, "Last name can not contain numbers or special characters, except a hyphen")
        .required("Last name is required"),
        grade: yup
        .number()
        .min(9, "Course must be at least grade 9")
        .max(12, "Course may not be larger than grade 12")
        .required("Grade level is required"),
      });

    const formik = useFormik({
        initialValues: {
          firstName: "",
          lastName: "",
          grade: "default",
        },
        validationSchema: formSchema,
        onSubmit: (values, { resetForm }) => {
          fetch("http://127.0.0.1:5555/students", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(values, null, 2),
        })
        .then(res => {
            if (res.ok) {
                res.json().then(
                    data => {setStudents([...students, data])
                    resetForm()
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
                <label htmlFor="first-name">New student's first name: </label>
                <div>
                    <input type="text" 
                    id="first-name" 
                    name="firstName"
                    value={formik.values.firstName} 
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}/>
                    {formik.touched.firstName && formik.errors.firstName ? (
                    <p style={{ color: "red" }}>{formik.errors.firstName}</p>
                    ) : null}
                </div>
                <label htmlFor="last-name">New student's last name: </label>
                <div>
                    <input type="text" 
                    id="last-name" 
                    name="lastName"
                    value={formik.values.lastName} 
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}/>
                    {formik.touched.lastName && formik.errors.lastName ? (
                    <p style={{ color: "red" }}>{formik.errors.lastName}</p>
                    ) : null}
                </div>
                <label htmlFor="grade">Grade level: </label>
                    <div>
                        <select type="dropdown" 
                        name="grade"
                        id="grade" 
                        value={formik.values.grade} 
                        onChange={formik.handleChange}>
                            <option value="default">Select One</option>
                            <option value="9">9</option>
                            <option value="10">10</option>
                            <option value="11">11</option>
                            <option value="12">12</option>
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
export default AddStudent