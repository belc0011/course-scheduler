import React, { useState } from "react";
import { useFormik } from "formik";
import * as yup from "yup";
import { useHistory } from 'react-router-dom';

function AddTeacher({teachers, setTeachers}) {
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
      });

    const formik = useFormik({
        initialValues: {
          firstName: "",
          lastName: "",
        },
        validationSchema: formSchema,
        onSubmit: (values, { resetForm }) => {
          fetch("http://127.0.0.1:5555/teachers", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(values, null, 2),
        })
        .then(res => {
            if (res.ok) {
                res.json().then(
                    data => {setTeachers([...teachers, data])
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
                <label htmlFor="first-name">New teacher's first name: </label>
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
                <label htmlFor="last-name">New teacher's last name: </label>
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
                <div>
                    <p></p>
                    <button type="submit">Submit</button>
                </div>
            </form>
        </div>
    )
}
export default AddTeacher