#!/usr/bin/env python3

# Standard library imports
from random import randint, choice as rc
import random

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
        names = ['English', 'Spanish', 'Algebra 1', 'Algebra 2', 'Criminal Justice', 'Art', 'History', 'Biology', 'Chemistry', 'P.E', 'Ceramics', 'Weights', 'Choir', "Band", "Orchestra", "Geometry", "Calculus", "Pre-Calculus", "Economics", "Algebra Support", "Computer Science"]
        credits = [1, 2, 3, 4, 5]
        student_id = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]
        teacher_id = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]
        random.shuffle(names)

        for n in range(21):
            course = Course(name=names[n % len(names)], student_id=rc(student_id), teacher_id=rc(teacher_id))
            courses.append(course)

        db.session.add_all(teachers)
        db.session.add_all(students)
        db.session.add_all(courses)
        db.session.commit()
        
        print('seeding finished')
