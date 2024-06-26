# Course Scheduler

## Introduction
This project is a fully functional web application designed to help counselors with the daunting task of creating schedules. Using this website you can generate lists of all students, teachers, and courses in the database. This allows you to do the following things:
- Pull up a specific student to see a full list of their current courses
- Pull up a specific teacher to see which courses they are currently teaching
- Pull up course details, edit course details, and delete a course
- Add students to a course
- Add teachers as the teacher of record for a course

The front-end is built with React (a Javascript library for building User Interfaces) and the back-end is built using Flask (a Python web framework) with the assistance of Flask RESTful to provide RESTful API's. 

## Important Files

### AddCourse.js

This component allows the user to add a new course to the database. For ease of use, this screen only requests the course name and the number of credits. Other components will allow the user to add a student to the course, as the user will likely only have the course names to begin, and will begin to add student names at a later date. The form is a controlled form created using Formik, and there are validations in place so that the name of the course may not contain special characters (except a white space and a period).

### AddStudent.js

This component allows the user to create a new student record by entering the required information into the controlled form (created using Formik). Formik has validations in place so the student's first name may not include any special characters with the exception of an apostrophe (which may be present in some first names), and the student's last name may not include any numbers or special characters (with the exception of a hyphen, for students with hyphenated last names).


### App.js

This is the top-level component which is responsible for rendering the NavBar component as well as holding the router, which in turn is responsible for rendering the following components at the following routes:
- Home.js (route: '/')
- Teachers.js (route: '/teachers')
- TeacherPage.js (route: '/teachers/:id')
- Students.js (route: '/students')
- StudentPage.js (route: '/students/:id')
- Courses.js (route: '/courses')
- CoursePage.js (route: '/courses/:id')
- DeleteCourse.js (route: '/courses/delete/:id')

The remaining components are rendered inside one of these components.

### CourseCard.js

This component holds the logic to display each course's information in a uniform fashion. It is rendered by the Courses.js component using a map function.

### CoursePage.js

This component renders the information only for the course whose name was clicked (whose ID is in the URL for this page). It renders the course's information upon page load utilizing a fetch request inside of UseEffect. This component holds a controlled forms (made using Formik) which is responsible for updating the class information as well as adding students who are enrolled in the course and also adding a teacher of record for the course. The fields are optional so the user can submit one (or more) attributes to update about the course. This component also redirects to the DeleteCourse.js component upon a button click (using a useHistory hook).

### DeleteCourse.js

This component is rendered when the user clicks the "delete course" button on a previous page. This component then serves as an additional layer of confirmation that the user wishes to delete the course (as opposed to the user clicking the button accidentally). Once the user clicks the "submit" button in this component, the entire course record will be deleted. 

### Home.js

This component is the home page and is rendered when the domain is first visited. It holds a welcome screen as well as buttons responsible for navigating to the other components. 

### NavBar.js

This component holds the navigation bar which displays at the top of each web page, navigating to Courses.js, Students.js, and Teachers.js.

### StudentCard.js

This component holds the logic to display each student's information in a uniform fashion. It is rendered by the Students.js component using a map function.

### StudentPage.js

This component renders the information only for the student whose name was clicked (whose ID is in the URL for this page). It renders the student's information upon page load utilizing a fetch request inside of UseEffect. The courses the student is currently enrolled in are displayed, and the courses are clickable. 

### Students.js

This component renders the list of students in the database. This component has a button "add student" which conditionally renders the AddStudent.js component to allow the user to add a new student. It makes a fetch request for all of the students and renders them by rendering the StudentCard.js component for each student (using a map function). 

### TeacherCard.js

This component holds the logic to display each teacher's information in a uniform fashion. It is rendered by the Teachers.js component using a map function.

### TeacherPage.js

This component renders the information only for the teacher whose name was clicked (whose ID is in the URL for this page). It renders the teacher's information upon page load utilizing a fetch request inside of UseEffect. The courses the teacher is currently teaching are displayed, and the courses are clickable. 
