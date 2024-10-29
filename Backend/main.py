from fastapi import FastAPI, HTTPException, Request
from pydantic import BaseModel, Field
from sqlalchemy import create_engine, Column, Integer, String, Date, ForeignKey,update,distinct
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker
from typing import List
import json

# Database setup
SQLALCHEMY_DATABASE_URL = "sqlite:///./studentinformation.db"
engine = create_engine(SQLALCHEMY_DATABASE_URL, connect_args={"check_same_thread": False})
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)
Base = declarative_base()

# FastAPI instance
app = FastAPI()

# CORS configuration (optional, remove if not needed)
from fastapi.middleware.cors import CORSMiddleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Adjust as needed
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class STUDENT(Base):
    __tablename__ = "Students"
    Roll_Number = Column(String, primary_key=True, index=True)
    Name = Column(String, index=True)
    Date_of_Birth = Column(String)
    imageUrl = Column(String)
    Gender = Column(String)
    Age = Column(Integer)
    phone_number = Column(String)
    Mail = Column(String)
    Attendance = Column(Integer)
    performance = Column(Integer)
    Branch = Column(String)
    Year = Column(Integer)

class Attendance(Base):
    __tablename__ = "Attendance"
    id = Column(Integer, primary_key=True, index=True,autoincrement=True)
    Dates = Column(String)
    Roll_Number = Column(String, ForeignKey('Students.Roll_Number'), index=True)
    Year = Column(Integer)
    Branch = Column(String)
    Remark = Column(String)

class Teacher(Base):
    __tablename__ = "teachers"
    id = Column(Integer, primary_key=True, index=True,autoincrement=True)
    Name = Column(String)
    Password = Column(String)
    Role = Column(String)

class StudentAuth(Base):
    __tablename__ = "StudentAuth"
    id = Column(Integer, primary_key=True, index=True,autoincrement=True)
    Roll_Number = Column(String, ForeignKey('Students.Roll_Number'))
    Password = Column(String)

class Library(Base):
    __tablename__ = "Library"
    id = Column(Integer, primary_key=True, index=True,autoincrement=True)
    Dates = Column(String)
    Roll_Number = Column(String, ForeignKey('Students.Roll_Number'), index=True)
    Book_id = Column(Integer,ForeignKey('books.id'), index= True)
    Book_Name = Column(String)
    Status = Column(String)
class Book(Base):
    __tablename__ = "books"
    id = Column(Integer, primary_key=True, index=True)
    Name = Column(String)
    bookUrl = Column(String)
    Number_of_books = Column(Integer)
class Fee(Base):
    __tablename__ = "fees"
    id = Column(Integer, primary_key=True, index=True,autoincrement=True)
    Fee_Receipt = Column(String) #Date of payment
    Roll_Number = Column(String, ForeignKey('Students.Roll_Number'), index=True) #Roll Number
    Fee_staus = Column(String) #Amount Due
Base.metadata.create_all(bind=engine)
# Validations
class AttendanceBase(BaseModel):
    Dates: str
    Roll_Number: str
    year: int
    Branch: str
    Remark: str

    class Config:
        arbitrary_types_allowed = True
        from_attributes = True

class LibraryBase(BaseModel):
    Dates: str
    Roll_Number: str
    Book_id : int
    Book_Name : str
    Status: str
    
    class Config:
        arbitrary_types_allowed = True
        from_attributes = True

# db = SessionLocal()
# for student in students_data:
#     new_student=STUDENT(**student)
#     db.add(new_student)
# db.commit()
# print("commited")
# db.close()
@app.get("/list")
def read_list():
    db = SessionLocal() 
    products = db.query(STUDENT).all()
    db.close()
    return products
@app.get("/student/{branch}/{year}")
def see_student(branch: str, year: int):
    db = SessionLocal()
    student = db.query(STUDENT).filter(STUDENT.Branch == branch).filter(STUDENT.Year == year).all()
    db.close()
    return student
@app.post("/student/add")
def add_student(information: dict):
    db = SessionLocal()
    student = STUDENT(**information)
    db.add(student)
    db.commit()
    db.close()
    return db

@app.put("/student/update/{Roll}")
def update_student(Roll:str , information : dict):
    db = SessionLocal()
    db_product = db.query(STUDENT).filter(STUDENT.Roll_Number == Roll).first()
    if db_product is None:
        db.close()
        raise HTTPException(status_code=404, detail="Product not found")
    for key, value in information.items():
        setattr(db_product, key, value)
    db.commit()
    db.refresh(db_product)
    db.close()
    return db_product
@app.get("/books")
def read_books():
    db = SessionLocal()
    books = db.query(Book).all()
    db.close()
    return books
@app.get("/books/{id}")  
def read_book(id:int):
    db = SessionLocal()
    book = db.query(Book).filter(Book.id == id).first()
    db.close()
    if book is None:
        return {"Error":"NO such Book exists"}
    return book
@app.get("/book/{Name}")  
def read_book(Name:str):
    db = SessionLocal()
    book = db.query(Book).filter(Book.Name == Name).all()
    db.close()
    if book is None:
        return {"Error":"NO such Book exists"}
    return book
@app.post("/Library")
def adding_data(response : dict):
    db = SessionLocal()
    db_book = Library(**response)
    db.add(db_book)
    db.commit()
    db.refresh(db_book)
    db.close()
    return db_book
@app.get("/decrement/{id}")
def decrement_data(id : int):
    db = SessionLocal()
    db.execute(
        update(Book).
        where(Book.id ==id).
        values(Number_of_books=Book.Number_of_books - 1)
    )
    db.commit()
    db.close()
@app.get("/increment/{id}/{Roll}")
def increment(id : int, Roll:str):
    db = SessionLocal()
    db.execute(
        update(Book).
        where(Book.id ==id).
        values(Number_of_books=Book.Number_of_books + 1)
    )
    people = db.query(Library).filter(Library.Book_id==id).filter(Library.Roll_Number == Roll).all()
    for p in people:
        db.delete(p)
    db.execute(
        update(Library).
        where(Library.Book_id == id, Library.Roll_Number == Roll).
        values(Status = "Returned")
    )
    db.commit()
    db.close()
@app.get("/BookInfo/{id}")
def read_students(id : int):
    db = SessionLocal()
    people = db.query(Library).filter(Library.Book_id == id).all()
    db.close()
    return people
@app.get("/student/{Roll}")
def read_students(Roll : str):
    db = SessionLocal()
    student = db.query(STUDENT).filter(STUDENT.Roll_Number ==Roll).first()
    db.close()
    if student is None:
        return {"Error":"No such student exist"}
    return student
@app.get("/students/{Name}")
def read_students(Name :str):
    db = SessionLocal()
    student = db.query(STUDENT).filter(STUDENT.Name ==Name).first()
    db.close()
    if student is None:
        return {"Error":"No such student exist"}
    return student
@app.delete("/student/{Roll}")
def read_students(Roll:str):
    db = SessionLocal()
    student = db.query(STUDENT).filter(STUDENT.Roll_Number == Roll).first()
    db.delete(student)
    db.commit()
    db.close()
    return student
@app.put("/student/edit/{Roll}")
def edit_students(Roll : str, Student:dict):
    db= SessionLocal()
    db_student = db.query(STUDENT).filter(STUDENT.Roll_Number == Roll).first()
    if db_student is None:
        db.close()
        return {"Error" : "NO such student exist"}
    for key, value in Student.items():
        setattr(db_student, key, value)
    db.commit()
    db.refresh(db_student)
    db.close()
    return db_student
@app.post("/students/add")
def add_student(student : dict):
    db = SessionLocal()
    Student = STUDENT(**student)
    db.add(Student)
    db.commit()
    db.close()
    return Student
@app.post("/Attendance/add/{Roll}/{year}/{branch}")
def add_student(Roll : str, info: dict, year: int, branch: str):
    db = SessionLocal()
    Attend = Attendance(**info)
    db.add(Attend)
    db.commit()
    Number = db.query(Attendance.Dates).filter(Attendance.Year == year).filter(Attendance.Branch == branch).distinct().all()
    present = db.query(Attendance).filter(Attendance.Roll_Number == Roll).filter(Attendance.Year == year).filter(Attendance.Branch == branch).filter(Attendance.Remark=='P').all()
    percentage = ( len(present)/len(Number) ) *100
    print(percentage)
    db.execute(
        update(STUDENT).
        where(STUDENT.Roll_Number == Roll).
        values(Attendance = percentage)
    )
    db.commit()
    db.close()

    return Attend
@app.get("/checkAttendance/{branch}/{year}/{date}")
def check_attendance(branch: str, year: int , date:str):
    db = SessionLocal()
    Attend = db.query(Attendance).filter(Attendance.Dates==date).filter(Attendance.Branch == branch).filter(Attendance.Year == year).all()
    if len(Attend) ==0 :
        return {"Continue": "you can take attendance"}
    else:
        return {"Error": "Attendance is already taken"}

@app.get("/Fee/{Roll}")
def add_fee(Roll : str):
    db = SessionLocal()
    fees = db.query(Fee).filter(Fee.Roll_Number == Roll).first()
    db.close()
    if fees is None:
        return {"error":"error"}
    else:
        return fees
@app.get("/Fee/update/{Roll}/{Dates}")
def update_fee(Roll : str, Dates: str):
    db = SessionLocal()
    db.execute(
        update(Fee).
        where(Fee.Roll_Number == Roll).
        values(Fee_staus = "0",Fee_Receipt = Dates)
    )
    db.commit()
    name = db.query(Fee).filter(Fee.Roll_Number == Roll).all()
    db.close()
    return name
@app.get("/get/attendance/{Roll}")
def get_attendance(Roll : str):
    db = SessionLocal()
    student = db.query(Attendance).filter(Attendance.Roll_Number == Roll).all()
    db.close()
    return student

@app.get("/get/library/{Roll}")
def get_library(Roll : str):
    db = SessionLocal()
    student = db.query(Library).filter(Library.Roll_Number == Roll).all()
    db.close()
    return student

@app.get("/get/fee/{Roll}")
def get_fee(Roll : str):
    db = SessionLocal()
    student = db.query(Fee).filter(Fee.Roll_Number == Roll).all()
    db.close()
    return student
@app.get("/check/student/{Roll}/{password}")
def check_student(Roll : str, password: str ):
    db = SessionLocal()
    student = db.query(StudentAuth).filter(StudentAuth.Roll_Number==Roll).filter(StudentAuth.Password == password).first()
    if student is None:
        return {"Error": "student not found"}
    else:
        return student
@app.get("/check/teacher/{Name}/{password}")
def check_teacher(Name: str,password: str):
    db =SessionLocal()
    teacher = db.query(Teacher).filter(Teacher.Name == Name).filter(Teacher.Password == password).first()
    if teacher is None:
        return {"Error" : "No teacher exist"}
    else:
        return teacher