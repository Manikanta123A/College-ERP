import React, { useEffect } from 'react';
import { useState } from 'react';
import axios from 'axios';
function FEE() {
    let [Roll , setRoll] = useState("")
    let [data, setdata] = useState([])
    let [err, seterr] = useState(false)
    let [show, setshow] = useState(true)
    let checking = ()=>{
        if (localStorage.getItem('ROLE') != 'A'){
            window.location.href = "http://localhost:5173/Not"
        }
    }
    useEffect(()=>{
      
    },[])
    let click = (e)=>{
        seterr(false)
        setRoll(e.target.value)
    }
    let RollSubmit = async (e)=>{
        e.preventDefault()
        let response = await axios.get(`http://localhost:8000/Fee/${Roll}`)
        if (response.data.error != undefined){
            seterr(true)
        }
        else{
            setshow(false)
            setdata(response.data)
        }
    }
    let go =(e)=>{
        e.preventDefault()
        window.location.href = "http://localhost:5173/Fee"
    }
    let up = async (e)=>{
        e.preventDefault()
        let information = new Date(Date.now()).toISOString().split('T')[0]
        let response = await axios.get(`http://localhost:8000/Fee/update/${Roll}/${information}`)
        setRoll("")
        window.location.href = "http://localhost:5173/Fee"
    }
    return (<>
     {err && <h1 style={{textAlign:'center'}}>NO SUCH ROLL NUMBER EXISTS</h1>}
     <h1 style={{textAlign:'center' , marginTop:"40px"}}>FEE PAYMENTS</h1>
         <div className='signup'>
        <div className='signup-box'>
       {show?  <div>
        <form onSubmit={RollSubmit}>
               <div className='Name'>
                <label htmlFor='Roll'><h3>ROLL NUMBER</h3></label>
                <input type='text' id='Roll' value={Roll} placeholder='Enter THE ROLL NUMBER' onChange={click} required/>
                <button className='btn'>SUBMIT</button>
                </div>
        </form>
        </div>:
        <div className='Name' style={{textAlign:'center'}}>
            <form>
            <h1>ROLL_NUMEBR :  &nbsp;{data.Roll_Number} </h1>
            <h1>FEE_DUE : &nbsp; {data.Fee_staus}</h1>
            {data.Fee_staus=="0"? <><h1 style={{color:"Green"}}>FEE PAID</h1>
            <button className='btn' onClick={go}>GO BACK</button></>:<button className='btn' onClick={up}>PAY</button>}
            </form>
                </div>
               }
               </div>
    </div></> );
}

export default FEE;