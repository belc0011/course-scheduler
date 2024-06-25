#!/usr/bin/env python3

# Standard library imports
from random import randint, choice as rc

# Remote library imports
from faker import Faker

# Local imports
from app import app
from models import db, Teacher, Student, Course

if __name__ == '__main__':
    fake = Faker()
    with app.app_context():
        print("Starting seed...")
        # Delete all rows in the tables
        Teacher.query.delete()
        Student.query.delete()
        Course.query.delete()

        # Create an empty list
        teachers = []

        # Add some Pet instances to the list
        for n in range(10):
            teacher = Teacher(first_name=fake.first_name(), last_name=fake.last_name())
            teachers.append(teacher)
        
        students = []
        grades = [9, 10, 11, 12]

        for n in range(10):
            student = Student(first_name=fake.first_name(), last_name=fake.last_name(), grade=rc(grades))
            students.append(student)
        
        courses = []
        names = ['English', 'Spanish', 'Algebra 1', 'Algebra 2', 'Criminal Justice', 'Art', 'History', 'Biology', 'Chemistry']
        credits = [1, 2, 3, 4, 5]
        start_time = ['7:30 am', '8:00 am', '8:30 am', '9:00 am', '9:30 am', '10:00 am', '10:30 am']
        end_time = ['11:00 am', '11:30 am', '12:00 pm', '12:30 pm', '1:00 pm', '1:30 pm', '2:00 pm', '2:30 pm']

        for n in range(10):
            course = Course(name=rc(names), start_time=rc(start_time), end_time=rc(end_time))
            courses.append(course)

        db.session.add_all(teachers)
        db.session.add_all(students)
        db.session.add_all(courses)
        db.session.commit()
        
        print('seeding finished')
