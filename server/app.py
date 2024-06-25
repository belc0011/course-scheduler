#!/usr/bin/env python3

# Standard library imports

# Remote library imports
from flask import request, make_response
from flask_restful import Resource

# Local imports
from config import app, db, api
# Add your model imports
from models import Teacher, Student, Course

# Views go here!

class Home(Resource):

    def get(self):

        response_dict = {
            "message": "Welcome to the Newsletter RESTful API",
        }

        response = make_response(
            response_dict,
            200
        )

        return response

class Teachers(Resource):
    def get(self):
        teachers = Teacher.query.order_by(Teacher.last_name).all()
        if teachers:
            teacher_list = []
            for teacher in teachers:
                teacher_list.append(teacher.to_dict())
            response = make_response(teacher_list, 200)
            return response
        else:
            return {'error': 'No teachers found'}, 404
    def post(self):
        request_dict = request.get_json()
        new_teacher = Teacher(
            first_name = request_dict.get('first_name'),
            last_name = request_dict.get('last_name')
        )
        if new_teacher:
            db.session.add(new_teacher)
            db.session.commit()
            response = make_response(new_teacher.to_dict(), 201)
            return response
        else:
            return {'error': 'Missing required info'}, 400

class TeacherById(Resource):
    def get(self, id):
        teacher = Teacher.query.filter_by(id=id).first()
        if teacher:
            response = make_response(teacher.to_dict(), 200)
            return response
        else:
            return {'error': 'requested teacher not found'}, 404

    def post(self, id):
        pass

class Students(Resource):
    def get(self):
        students = Student.query.order_by(Student.last_name).all()
        if students:
            student_list = []
            for student in students:
                student_list.append(student.to_dict())
            response = make_response(student_list, 200)
            return response
        else:
            return {'error': 'no student data found'}, 404

    def post(self):
        pass

class StudentById(Resource):
    def get(self, id):
        student = Student.query.filter_by(id=id).first()
        if student:
            response = make_response(student.to_dict(), 200)
            return response
        else:
            return {'error': 'unable to locate student'}, 404

    def post(self, id):
        pass

class Courses(Resource):
    def get(self):
        courses = Course.query.order_by(Course.name).all()
        course_list = []
        if courses:
            for course in courses:
                course_list.append(course.to_dict())
            response = make_response(course_list, 200)
            return response
        else:
            return {'error': 'no courses found'}, 404


    def post(self):
        request_dict = request.get_json()
        new_course = Course(
            name = request_dict.get('name').title(),
            credits = request_dict.get('credits')
        )
        if new_course:
            db.session.add(new_course)
            db.session.commit()
            updated_record = new_course.to_dict()
            response = make_response(updated_record, 201)
            return response
        else:
            {'error': 'required fields missing'}, 400

class CourseById(Resource):
    def get(self, id):
        course = Course.query.filter_by(id=id).first()
        if course:
            response = make_response(course.to_dict(), 200)
            return response
        else:
            return {'error': 'course not found'}, 404

    def post(self, id):
        pass

    def patch(self, id):
        request_dict = request.get_json()
        course_to_edit = Course.query.filter_by(id=id).first()
        print(course_to_edit)
        if course_to_edit:
            if request_dict['name']:
                course_to_edit.name = request_dict['name'].title()
            if request_dict['credits']:
                course_to_edit.credits = request_dict['credits']

            db.session.add(course_to_edit)
            db.session.commit()
            updated_record = course_to_edit.to_dict()
            response = make_response(updated_record, 200)
            return response
        else:
            return {'error': 'requested course not found'}, 400

    def delete(self, id):
        pass


api.add_resource(Home, '/', endpoint='')
api.add_resource(Teachers, '/teachers', endpoint='teachers')
api.add_resource(TeacherById, '/teachers/<int:id>', endpoint='teachers/<int:id>')
api.add_resource(Students, '/students', endpoint='students')
api.add_resource(StudentById, '/students/<int:id>', endpoint='students/<int:id>')
api.add_resource(Courses, '/courses', endpoint='courses')
api.add_resource(CourseById, '/courses/<int:id>', endpoint='courses/<int:id>')

if __name__ == '__main__':
    app.run(port=5555, debug=True)

