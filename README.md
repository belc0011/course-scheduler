### app.py

This is the file which holds all of the Resources that represent the various API endpoints necessary to carry out all of the requests described in the components listed above. Below is a description of each resource within this file:

- Teachers: This resource has a "get" and "post" method. The "get" method retrieves all of the teachers from the 'teachers' database table and sends them back in JSON format. 
API endpoint: /teachers
HTTP Methods: GET, POST
Response: GET sends back the teachers in JSON format, POST sends back the newly created record in JSON format.

-TeacherById: This resource has a "get" method which retrieves the specified teacher's record (by id) and sends it back in JSON format.
API endpoint: /teachers/:id
HTTP Methods: GET
Response: Requested teacher record in JSON format.

- Students: This resource has a "get" and "post" method. The "get" method retrieves all of the students from the 'students' database table. The "post" method allows the user to create a new "student" record and store it in the 'students' database table.
API endpoint: /students
HTTP Methods: GET, POST
Respones: GET sends back the students in JSON format, POST sends back the newly created record in JSON format.

- StudentById: This resource has a "get" method which retrieves the spescified student's record (by id) and sends it back in JSON format.
API endpoint: /students/:id
HTTP Methods: GET
Response: Requested student record in JSON format.

- Courses: This resource has a "get" and "post" method which allow the user to retrieve a list of courses from the database, as well as create a new course record in the database. 
API endpoint: /courses
HTTP Methods: GET, POST
Response: GET sends back the courses in JSON format, POST sends back the newly created record in JSON format.

- CourseById: This resource has a "get", "patch", and "delete" method which allow the user to edit course records, get a specific course record, or delete an existing course record. 
API endpoint: /courses/:id
HTTP Methods: GET, PATCH, DELETE
Response: GET sends back the requested course in JSON format, PATCH sends back the udpated record in JSON format, and DELETE sends back a confirmation message with a 204 code.

### models.py

This file holds all of the models necessary to create the appropriate databases. Below is a brief description of each model.

- The Student class has the following attributes: ID (primary key), first name, last name, grade, as well as a relationship with courses.
- The Teacher class has the following attributes: ID (primary key), first name, last name, as well as a relationship with courses. 
- The Courses class has the following attributes: ID (primary key), name, student ID (foreign key which references the 'students' table), and teacher ID (foreign key which references the 'teachers' table). It also has relationships established with student and teacher.

### config.py

Holds all of the necessary configurations to utilize the functionalities provided by Flask, Flask-Restful, SQLAlchemy, CORS, and BCrypt (for future implementation).

### seed.py

Holds data to seed the database - can be utilized by running the command "python seed.py" from the server directory in terminal.

## Usage

The project is available using the following steps:
- git clone https://github.com/belc0011/course-scheduler
- pipenv install (to install backend dependencies)
- pipenv shell (to enter virtual environment)
- in a new terminal, cd into the client directory then run npm install to install front-end dependencies
- python app.py to run the server (from the server directory)

