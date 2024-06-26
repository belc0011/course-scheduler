import React from "react";
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
                <Teachers />
              </Route>
              <Route exact path="/teachers/:id">
                <TeacherPage />
              </Route>
              <Route exact path="/students">
                <Students />
              </Route>
              <Route exact path="/students/:id">
                <StudentPage />
              </Route>
              <Route exact path="/courses">
                <Courses />
              </Route>
              <Route exact path="/courses/:id">
                <CoursePage />
              </Route>
              <Route exact path="/courses/delete/:id">
                <DeleteCourse />
              </Route>
            </Switch>
          </main>
        </>
      </Router>
  )
}

export default App;
