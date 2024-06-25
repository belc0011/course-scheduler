from sqlalchemy_serializer import SerializerMixin
from sqlalchemy.ext.associationproxy import association_proxy
from sqlalchemy import Time

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

class Course(db.Model, SerializerMixin):
    __tablename__ = "courses"

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String)
    credits = db.Column(db.Integer)
    start_time = db.Column(db.String)
    end_time = db.Column(db.String)
    student_id = db.Column(db.Integer, db.ForeignKey('students.id'))
    teacher_id = db.Column(db.Integer, db.ForeignKey('teachers.id'))

    student = db.relationship('Student', back_populates='courses')
    teacher = db.relationship('Teacher', back_populates='courses')
    serialize_rules=('-student.courses', '-teacher.courses')