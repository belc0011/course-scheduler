import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Home from './Home'
import Teachers from './Teachers'
import Courses from './Courses'
import Students from './Students'
import TeacherPage from './TeacherPage'
import StudentPage from "./StudentPage";
import CoursePage from "./CoursePage";
import NavBar from "./NavBar"
import DeleteCourse from "./DeleteCourse";

function App() {
  const [courses, setCourses] = useState([])
  const [students, setStudents] = useState([])
  const [teachers, setTeachers] = useState([])

  useEffect(() => {
    fetch(`http://127.0.0.1:5555/courses`, {
    method: "GET",
    })
    .then(res => {
        if (res.ok) {
            res.json().then(data => setCourses(data))
        }
        else {
            console.log("error: " + res)
        }
    })
    .catch(error => {
        console.error("Error parsing JSON:", error);
    })
}, [])
useEffect(() => {
  fetch("http://127.0.0.1:5555/students", {
  method: "GET",
  })
  .then(res => {
      if (res.ok) {
          res.json().then(data => {
              setStudents(data)
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

useEffect(() => {
  fetch(`http://127.0.0.1:5555/teachers`, {
  method: "GET",
  })
  .then(res => {
      if (res.ok) {
          res.json().then(data => setTeachers(data))
      }
      else {
          console.log("error: " + res)
      }
  })
  .catch(error => {
      console.error("Error parsing JSON:", error);
  })
}, [])

  return (
    <Router>
        <>
          <NavBar />
          <main>
            <Switch>
              <Route exact path="/">
                <Home />
              </Route>
              <Route exact path="/teachers">
                <Teachers teachers={teachers} setTeachers={setTeachers}/>
              </Route>
              <Route exact path="/teachers/:id">
                <TeacherPage />
              </Route>
              <Route exact path="/students">
                <Students students={students} setStudents={setStudents}/>
              </Route>
              <Route exact path="/students/:id">
                <StudentPage />
              </Route>
              <Route exact path="/courses">
                <Courses courses={courses} setCourses={setCourses}/>
              </Route>
              <Route exact path="/courses/:id">
                <CoursePage courses={courses} setCourses={setCourses}/>
              </Route>
              <Route exact path="/courses/delete/:id">
                <DeleteCourse courses={courses} setCourses={setCourses}/>
              </Route>
            </Switch>
          </main>
        </>
      </Router>
  )
}

export default App;
