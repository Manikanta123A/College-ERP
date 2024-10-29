import React from 'react';
import { useState,useEffect } from 'react';
import axios from 'axios';
import BookCard from './BookCard';
import NavBar2 from './Navbar2';
function Book() {
    let [data,setdata] = useState([])
    let [err, seterr] = useState(false)
    let checking = ()=>{
        if (localStorage.getItem('ROLE') != 'L'){
            window.location.href = "http://localhost:5173/Not"
        }
    }
    useEffect(()=>{
      
        fetchbooks()
    },[])
    const fetchbooks =async  ()=>{
        try {
            const response = await axios.get(`http://localhost:8000/books`);
            setdata(response.data);
        } catch (error) {
            console.error("Error fetching products:", error);
        }
    }
    let work = (argument)=>{
        setdata(argument)
    }
    let work2 = (argu)=>{
        seterr(argu)
    }
    return ( <>
    {err && <h1 style={{color:"red",textAlign:"center"}}>NO   SUCH   BOOK    EXIST</h1>}
    <NavBar2 fetchbooks={fetchbooks} work= {work} work2={work2}/> 
    <div className='List'>
        {data.map((dat)=>{
                return <BookCard data={dat} fetchbooks={fetchbooks}/>
        })}
    </div></> );
}

export default Book;