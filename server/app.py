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
        pass

    def post(self, id):
        pass

class Students(Resource):
    def get(self):
        pass

    def post(self):
        pass

class StudentById(Resource):
    def get(self, id):
        pass

    def post(self, id):
        pass

class Courses(Resource):
    def get(self):
        pass

    def post(self):
        pass

class CourseById(Resource):
    def get(self, id):
        pass

    def post(self, id):
        pass

    def patch(self, id):
        pass

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

