import React, { useState,useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import NavBar from '../components/NavBar';
import { Link } from 'react-router-dom';
function Show() {
    let [data , setdata] = useState([])
    let {Roll} = useParams()
    useEffect(()=>{
        fetchdata()
    },[])
    let fetchdata =async  ()=>{
        try{
            let response = await axios.get("http://localhost:8000/list")
            setdata(response.data)
        }
            catch (error) {
                console.error("Error fetching products:", error);
            }
    }
    let remove =async  (Roll)=>{
        let response = await axios.delete(`http://localhost:8000/student/${Roll}`)
        window.location.href = "http://localhost:5173/Home"
    }
    let edit = async ( Roll)=>{
        let response = await axios.get(`http://localhost:8000/student/${Roll}`)
        let datas = response.data
        console.log("hello")
        console.log(datas)
        localStorage.setItem("Name",datas.Name)
        localStorage.setItem("Roll",datas.Roll_Number)
        localStorage.setItem("Age",datas.Age)
        localStorage.setItem("Gender",datas.Gender)
        localStorage.setItem("performance",datas.performance)
        localStorage.setItem("Year",datas.Year)
        localStorage.setItem("Phone_number",datas.Phone_number)
        localStorage.setItem("url",datas.imageUrl)
        localStorage.setItem("Branch",datas.Branch)
        localStorage.setItem("mailId",datas.Mail)
        localStorage.setItem("DOB",datas.Date_of_Birth)
        localStorage.setItem("Attendance",datas.Attendance)
        window.location.href=`http://localhost:5173/Addpage`
    }
    return ( <>
    <NavBar/>
        <div className='show'>
            {data.map((student)=>{
                if(student.Roll_Number == Roll){
                    return (<div className='show-page'>
                        <div className='show'>
                            <img src={student.imageUrl} alt="student"/>
                            <h1>Name: &nbsp; {student.Name} </h1>
                            <h2>Roll Number: &nbsp;&nbsp; &nbsp; {student.Roll_Number}</h2>
                            <h2>Year : &emsp; &emsp; &emsp; &nbsp; &emsp; &nbsp;{student.Year}</h2>
                            <h2>Branch : &nbsp; &nbsp; &emsp; &emsp; &nbsp; {student.Branch}</h2>
                            <h2>Date of Birth: &nbsp; &emsp;{student.Date_of_Birth} </h2>
                            <h2>Age: &nbsp; &emsp; &emsp; &emsp;&emsp; &emsp;{student.Age}</h2>
                            <h2>Gender: &nbsp; &emsp;&emsp;&emsp;&emsp;{student.Gender} </h2>
                            <h2>Phone Number: &nbsp; {student.phone_number}</h2>
                            <h2>Mail Id: &emsp;&emsp;&emsp;&emsp;&emsp;{student.Mail}</h2>
                            <h2>Attendance :&nbsp;&nbsp;&emsp;&emsp;{student.Attendance} %</h2>
                            <h2>Performance :&nbsp;&emsp;&nbsp;&nbsp;{student.performance} %</h2>
                        </div>
                        <div className='btns'>
                            <button onClick={()=>{edit(student.Roll_Number)}}>Edit &nbsp;&nbsp; <i className="fa-solid fa-pen-to-square"></i></button>
                            <button onClick={()=>{remove(student.Roll_Number)}}>Delete</button>
                        </div>
                    </div>)
                }
            })}
        </div>
        </>
     );
}

export default Show;