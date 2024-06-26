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
            first_name = request_dict.get('firstName').title(),
            last_name = request_dict.get('lastName').title()
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
        request_dict = request.get_json()
        print(request_dict)
        new_student = Student(
            first_name=request_dict.get('firstName').title(),
            last_name=request_dict.get('lastName').title(),
            grade=request_dict.get('grade')
        )
        if new_student:
            db.session.add(new_student)
            db.session.commit()
            response = make_response(new_student.to_dict(), 201)
            return response
        else:
            return {'error': 'missing required parameters'}, 400

class StudentById(Resource):
    def get(self, id):
        student = Student.query.filter_by(id=id).first()
        if student:
            response = make_response(student.to_dict(), 200)
            return response
        else:
            return {'error': 'unable to locate student'}, 404

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

    def patch(self, id):
        request_dict = request.get_json()
        course_to_edit = Course.query.filter_by(id=id).first()
        print(course_to_edit)
        if course_to_edit:
            if request_dict.get('name'):
                course_to_edit.name = request_dict['name'].title()
            if request_dict.get('credits'):
                course_to_edit.credits = request_dict['credits']
            if request_dict.get('studentName'):
                full_name = request_dict['studentName']
                names = full_name.split()
                first_name = names[0].title()
                last_name = names[1].title()
                student = Student.query.filter_by(first_name=first_name, last_name=last_name).first()
                if student:
                    course_to_edit.student_id = student.id
                else:
                    return {'error': 'Must submit first and last name separated by a space'}, 400
            if request_dict.get('studentId'):
                course_to_edit.student_id = request_dict['studentId']
            if request_dict.get('teacherName'):
                full_name = request_dict['teacherName']
                names = full_name.split()
                first_name = names[0].title()
                last_name = names[1].title()
                teacher = Teacher.query.filter_by(first_name=first_name, last_name=last_name).first()
                if teacher:
                    course_to_edit.teacher_id = teacher.id
                else:
                    return {'error': 'Must submit first and last name separated by a space'}, 400
            if request_dict.get('teacherId'):
                course_to_edit.teacher_id = request_dict['teacherId']
            db.session.add(course_to_edit)
            db.session.commit()
            updated_record = course_to_edit.to_dict()
            response = make_response(updated_record, 200)
            return response
        else:
            return {'error': 'requested course not found'}, 404

    def delete(self, id):
        course_to_delete = Course.query.filter_by(id=id).first()
        if course_to_delete:
            db.session.delete(course_to_delete)
            db.session.commit()
            return {'message': 'record successfully deleted'}, 204
        else:
            return {'error': 'unable to locate course record'}, 404


api.add_resource(Teachers, '/teachers', endpoint='teachers')
api.add_resource(TeacherById, '/teachers/<int:id>', endpoint='teachers/<int:id>')
api.add_resource(Students, '/students', endpoint='students')
api.add_resource(StudentById, '/students/<int:id>', endpoint='students/<int:id>')
api.add_resource(Courses, '/courses', endpoint='courses')
api.add_resource(CourseById, '/courses/<int:id>', endpoint='courses/<int:id>')

if __name__ == '__main__':
    app.run(port=5555, debug=True)

