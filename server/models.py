from sqlalchemy_serializer import SerializerMixin
from sqlalchemy.ext.associationproxy import association_proxy
from sqlalchemy import Time
from sqlalchemy.orm import validates

from config import db

# Models go here!
class Teacher(db.Model, SerializerMixin):
    __tablename__ = "teachers"
    
    id = db.Column(db.Integer, primary_key=True)
    first_name = db.Column(db.String)
    last_name = db.Column(db.String)

    courses = db.relationship('Course', back_populates='teacher')
    serialize_rules=('-courses.teacher',)

class Student(db.Model, SerializerMixin):
    __tablename__ = "students"

    id = db.Column(db.Integer, primary_key=True)
    first_name = db.Column(db.String)
    last_name = db.Column(db.String)
    grade = db.Column(db.Integer)

    courses = db.relationship('Course', back_populates='student')
    serialize_rules=('-courses.student',)

    @validates('grade')
    def validate_grade(self, key, grade):
        if int(grade) < 9 or int(grade) > 12:
            raise ValueError("Invalid grade entered for high school")
        return grade

class Course(db.Model, SerializerMixin):
    __tablename__ = "courses"

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String, unique=True, nullable=False)
    credits = db.Column(db.Integer, nullable=False)
    student_id = db.Column(db.Integer, db.ForeignKey('students.id'))
    teacher_id = db.Column(db.Integer, db.ForeignKey('teachers.id'))

    student = db.relationship('Student', back_populates='courses')
    teacher = db.relationship('Teacher', back_populates='courses')
    serialize_rules=('-student.courses', '-teacher.courses')