import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import NavBar2 from './Navbar2';
function ShowBook() {
    let [data,setdata] = useState([])
    let {id} = useParams()
    let checking = ()=>{
        if (localStorage.getItem('ROLE') != 'L'){
            window.location.href = "http://localhost:5173/Not"
        }
    }
    useEffect(()=>{
       
        fetchdetails()
    },[])
    let fetchdetails = async ()=>{
        console.log(data)
        let response = await axios.get(`http://localhost:8000/BookInfo/${id}`)
        setdata(response.data)
    }
    let submitted = async (e,arg)=>{
        e.preventDefault()
        let response = await axios.get( `http://localhost:8000/increment/${id}/${arg}`)
        fetchdetails()
    }
    return ( 
        <>
        <NavBar2/>
        <h1 style={{textAlign:"center", margin:"15px "}}><b>Book ID: {id}</b></h1>
        <h3 style={{textAlign:"center",margin:"15px"}}><b>THE STUDENTS WHO TOOK THE BOOK</b> </h3>
        {data.map((dat)=>{
            return (<div className='flexi'>
            <h1>{dat.Dates}</h1>
            <h1>{dat.Roll_Number}</h1>
            <form onSubmit={(e)=>submitted(e,dat.Roll_Number )}>
            <button className='btn'> RETURN IT </button>
            </form>
        </div>)
        })}
        </>
     );
}

export default ShowBook;