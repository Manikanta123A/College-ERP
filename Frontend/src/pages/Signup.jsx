import React from 'react';
import { Link } from 'react-router-dom';
import { useState } from 'react';
import axios from 'axios';
import NOt from './NOT';
function Signup() {
    let [value, isvalue] = useState({ Roll: "", Password: "" })
    let [Teacher, isteacher] = useState({ teacher: "", Password: "" })
    let [Roll, isRoll] = useState(true)
    let [Name, isName] = useState(true)
    let [img , setimg] = useState("")
    let clicka = (event) => {
        isvalue({ ...value, [event.target.id]: event.target.value })
    }
    let clickb = (event) => {

        isteacher({ ...Teacher, [event.target.id]: event.target.value })
    }
    let studentLogin =async  (event) => {
        event.preventDefault()
        isvalue({ Roll: "", Password: "" })
        let response = await axios.get(`http://localhost:8000/check/student/${value.Roll}/${value.Password}`)
        console.log(response)
        if (response.data.Error != undefined){
            window.location.href = "http://localhost:5173/Not"
        }
        else{
            window.location.href = `http://localhost:5173/student/${value.Roll}`
            localStorage.setItem("ROLLNUMBER", value.Roll)
        }

    }
    let teacherLogin = async (event) => {
        event.preventDefault()
        isteacher({ teacher: "", Password: "" })
        let response = await axios.get(`http://localhost:8000/check/teacher/${Teacher.teacher}/${Teacher.Password}`)
        if (response.data.Error != undefined){
             window.location.href = "http://localhost:5173/Not"
             
        }
        else{
            if(response.data.Role == 'T'){
                localStorage.setItem("ROLE NAME", response.data.Name)
                localStorage.setItem("ROLE", response.data.Role)
                window.location.href='http://localhost:5173/teacher/selection'
            }
            else if(response.data.Role == 'L'){
                 window.location.href='http://localhost:5173/Books'
                 localStorage.setItem("ROLE NAME", response.data.Name)
                 localStorage.setItem("ROLE", response.data.Role)
            }
            else if(response.data.Role == 'A'){
                 window.location.href='http://localhost:5173/Fee'
                 localStorage.setItem("ROLE NAME", response.data.Name)
                 localStorage.setItem("ROLE", response.data.Role)
            }
        }
    }
    let picture = async ()=>{
        isRoll(false)
       
        let response = await axios.get(`http://localhost:8000/student/${value.Roll}`)
        setimg(response.data.imageUrl)
    }
    return (<div className='signup'>
        <div style={{ width: "100%", textAlign: "center" }}>
            <h1 style={{ textAlign: "center", width: "100%", marginBottom: "30px" }}><b>LOGIN PAGE</b></h1>
            {!Roll && <img src={img} widht="250px" height="150px" />}
        </div>
        <div className='signup-box'>
            <div className='controller'>
                <button className='btn btn-student' onClick={() => { isName(true) }}>Student</button>
                <button className='btn btn-student' onClick={() => { isName(false) }}>Teacher</button>
            </div>
            <div>
                {Name &&
                    <form onSubmit={studentLogin}>
                        {Roll && <> <div className='Name'>
                            <label htmlFor='Roll'><h1>Roll Number</h1></label>
                            <input type='text' id='Roll' value={value.Roll} placeholder='Enter your RollNumber' onChange={clicka} required />
                        </div>
                            <button className='btn btn-signup' onClick={picture}>Enter</button></>}
                        {!Roll && <>
                            <div className='Name'>
                                <label htmlFor='Password'><h1>Password</h1></label>
                                <input id="Password" type='Password' value={value.Password} onChange={clicka} placeholder='Enter your password' required />
                            </div>
                            <button className='btn btn-signup'>Signup</button></>}
                    </form>}
                {!Name &&
                    <form onSubmit={teacherLogin}>
                        <div className='Name'>
                            <label htmlFor='teacher'><h3>Name</h3></label>
                            <input type='text' id='teacher' value={Teacher.Name} placeholder='Enter your Name' onChange={clickb} required />
                        </div>
                        <div className='Name'>
                            <label htmlFor='Password'><h3>Password</h3></label>
                            <input id="Password" type='Password' value={Teacher.Password} onChange={clickb} placeholder='Enter your password' required />
                        </div>
                        <button className='btn btn-signup'>Signup</button>
                    </form>}
            </div>

        </div>
    </div>
    );
}

export default Signup;