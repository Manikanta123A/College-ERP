import React from 'react';
import { useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { useState,useEffect } from 'react';
import axios from 'axios';
function StudentCard() {
    let {Roll} = useParams()
    let [datas, setdatas] = useState([])
    let checking = ()=>{
        if (localStorage.getItem('ROLLNUMBER') != Roll){
            window.location.href = "http://localhost:5173/Not"
        }
    }
    useEffect( ()=>{
        checking()
        fetchdata()
    },[])
    let fetchdata = async ()=>{
        let response = await axios.get(`http://localhost:8000/student/${Roll}`)
        setdatas([response.data])
    }
    let logged = ()=>{
        localStorage.removeItem("ROLLNUMBER")
        window.location.href = 'http://localhost:5173/Signup'
    }
    return (  <div className='show'>
        {datas.map((student)=>{
            
                return (<div className='show-page'>
                    <div className='show'>
                        <img src={student.imageUrl} alt="student"/>
                        <h1>Name: &nbsp; {student.Name} </h1>
                        <h2>Roll Number: &nbsp; {student.Roll_Number}</h2>
                        <h2>Date of Birth: &nbsp;{student.Date_of_Birth} </h2>
                        <h2>Year :{student.Year}</h2>
                        <h2>Branch :  {student.Branch}</h2>
                        <h2>Age: &nbsp; {student.Age}</h2>
                        <h2>Gender: &nbsp; {student.Gender} </h2>
                        <h2>Phone Number: &nbsp; {student.phone_number}</h2>
                        <h2>Mail Id: {student.Mail} </h2>
                        <h2>Attendance :&nbsp;{student.Attendance} %</h2>
                        <h2>Performance :&nbsp;{student.performance} %</h2>
                    </div>
                    <div className='btns stu'>
                        <Link to={`/student/Attendance/${Roll}`} ><button>Show Attendance</button></Link>
                        <Link to={`/student/Library/${Roll}`} ><button>Show Library</button></Link>
                        <Link to={`/Student/Fee/${Roll}`}><button>Fee status</button></Link>
                    </div>

                    <button className='btn' style={{margin:"10px"}} onClick={logged}> LOGOUT </button>
                </div>)
            
        })}
    </div> );
}

export default StudentCard;