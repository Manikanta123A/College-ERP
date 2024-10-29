import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
function NavBar2({fetchbooks , work,work2}) {

    let submittedId = async (event)=>{
        event.preventDefault()
        setparams({id:"",Name:""})
        let response = await axios.get(`http://localhost:8000/books/${params.id}`)
        if(response.data.Error != undefined){
            work2(true)
        }
        else{
            work([response.data])
        }
    }
    let submittedName = async (event)=>{
        event.preventDefault()
        setparams({id:"",Name:""})
        let response = await axios.get(`http://localhost:8000/book/${params.Name}`)
        if(response.data.Error != undefined){
            work2(true)
        }
        else{
            work(response.data)
        }
    }
    let [params, setparams] = useState({id:"", Name: ""})
    let change = (e)=>{
        work2(false)
        setparams({...params,[e.target.id] : e.target.value})
    }

    return ( 
        <header className="navbar">
        <div className="logo-container">
           <Link> <img src="https://upload.wikimedia.org/wikipedia/en/thumb/6/68/Chaitanya_Bharathi_Institute_of_Technology_logo.png/220px-Chaitanya_Bharathi_Institute_of_Technology_logo.png" alt="COSC" /></Link>
            <h2>{localStorage.getItem("ROLE NAME")}</h2>
        </div>
        <nav>
            <ul className="nav">
                <li>
                <form onSubmit={submittedId} className='Book-input'>
                    <input  style={{height:"40px", width:"200px"}} type='number' id="id" placeholder='Search by BOOK ID' value={params.id} onChange={change} required/>
                    <button className='btn'>Search</button>
                </form>
                </li>
                <li>
                <form onSubmit={submittedName} className='Book-input'>
                    <input  style={{height:"40px", width:"200px"}}  id="Name" placeholder='SEARCH BY NAME' value={params.Name} onChange={change} required/>
                    <button className='btn'>Search</button>
                </form>
                </li>
              
                    <Link onClick={()=>{fetchbooks()}} to="/Books" className="nav-link iconn" style={{marginTop:"30px"}}>
                        All Books
                    </Link>
                
                    <Link to="/Signup"  onClick={()=>{localStorage.clear()}} style={{marginTop: "30px"}} className="nav-link iconn">
                        Logout
                    </Link>
                
            </ul>
        </nav>
    </header>
     );
}

export default NavBar2;