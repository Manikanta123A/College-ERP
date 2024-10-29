import React from 'react';
import { Link } from "react-router-dom";
import Logo from "../assets/COSC.png";
import { useState } from 'react';
import axios from 'axios';
function NavBar({work , work2,fetchdata}) {
    let [params, setparams] = useState({Roll : "", Name: ""})
    let change = (e)=>{
        console.dir(e)
        work2(false)
        setparams({...params,[e.target.id]:e.target.value})
    }
    let submittedRoll =async  (event)=>{
        event.preventDefault()
        setparams({Roll : "", Name: ""})
        let response = await axios.get(`http://localhost:8000/student/${params.Roll}`)
        if(response.data.Error != undefined){
            work2(true)
        }
        else{
            work([response.data])
        }
    }
    let submittedName = async (event)=>{
        event.preventDefault()
        setparams({Roll : "", Name: ""})
        let response = await axios.get(`http://localhost:8000/students/${params.Name}`)
        if(response.data.Error != undefined){
            work2(true)
        }
        else{
            work([response.data])
        }
    }
    return ( 
        <header className="navbar">
        <div className="logo-container">
           <Link to="/Home"> <img src="https://upload.wikimedia.org/wikipedia/en/thumb/6/68/Chaitanya_Bharathi_Institute_of_Technology_logo.png/220px-Chaitanya_Bharathi_Institute_of_Technology_logo.png" alt="COSC" /></Link>
            <h2>{localStorage.getItem("ROLE NAME")}</h2>
        </div>
        <nav>
            <ul className="nav">
            <li>
                <form onSubmit={submittedRoll} className='Book-input'>
                    <input  style={{height:"40px", width:"200px"}} type='text' id="Roll" placeholder='Search by Roll Numeber' value={params.Roll} onChange={change} required/>
                    <button className='btn'>Search</button>
                </form>
                </li>
                <li>
                <form onSubmit={submittedName} className='Book-input'>
                    <input  style={{height:"40px", width:"200px"}}  id="Name" placeholder='SEARCH BY NAME' value={params.Name} onChange={change} required/>
                    <button className='btn'>Search</button>
                </form>
                </li>
                <li>
                    <Link to="/Home" onClick={()=>{fetchdata()}} className="nav-link iconn" style={{marginTop:"30px"}}>
                        Home
                    </Link>
                </li>
                <li>
                    <Link to="/Attendance" className="nav-link iconn" style={{marginTop:"30px"}}>
                        Attendance
                    </Link>
                </li>
                <li>
                    <Link to="/teacher/selection" className="nav-link iconn" style={{marginTop:"30px"}}>
                        Search filters
                    </Link>
                </li>
                <li>
                    <Link to="/Signup"  onClick={()=>{localStorage.clear()}} className="nav-link iconn" style={{marginTop:"160px"}}>
                        Logout
                    </Link>
                </li>
            </ul>
        </nav>
    </header>
     );
}

export default NavBar;