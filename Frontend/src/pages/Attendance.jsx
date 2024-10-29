import React, { useEffect, useState } from 'react';
import NavBar from '../components/NavBar';
import axios from 'axios';
function Attendance() {
    let branch = localStorage.getItem('branch')
    let year = localStorage.getItem('year')
    let [datas, setdata] = useState([])
    let [i , seti] = useState(0)
    let [mindata , setmindata] = useState({})
    let [finish ,setfinish] = useState(false)
    let checking = ()=>{
        if (localStorage.getItem('ROLE') != 'T'){
            window.location.href = "http://localhost:5173/Not"
        }
    }
    useEffect(()=>{
       
        check()
        if(!finish){
            fetchdata()
        }
    },[])
    let check = async ()=>{
        let datee = new Date(Date.now()).toISOString().split('T')[0]
        let response = await axios.get(`http://localhost:8000/checkAttendance/${branch}/${year}/${datee}`)
        console.log(response.data)
        if (response.data.Error != undefined){
            setfinish(true)
        }
    }
    let fetchdata = async ()=>{
        let response = await axios.get(`http://localhost:8000/student/${branch}/${year}`)
        setdata(response.data)
        setmindata(response.data[0])
    }
    let mark = async (arg)=>{
        if (i == datas.length -1){
            setfinish(true)
            let info = {
                Dates :new Date(Date.now()).toISOString().split('T')[0],
                Roll_Number: mindata.Roll_Number,
                Year : year,
                Branch : branch,
                Remark :arg
            }
            let response = await axios.post(`http://localhost:8000/Attendance/add/${mindata.Roll_Number}/${year}/${branch}`, info)
            let result = response.data
        }
        else{
        seti(i+1)
        setmindata(datas[i+1])
        let info = {
            Dates :new Date(Date.now()).toISOString().split('T')[0],
            Roll_Number: mindata.Roll_Number,
            Year : year,
            Branch : branch,
            Remark :arg
        }
        let response = await axios.post(`http://localhost:8000/Attendance/add/${mindata.Roll_Number}/${year}/${branch}`, info)
        let result = response.data
        }
    }
    return ( <>
    <NavBar/>
    <div className='Attendance'>
        {!finish && <>
        <img style={{textAlign:'center'}} src={mindata.imageUrl} width="300px" height="200px" />
             <h1>{mindata.Roll_Number}</h1>
             <h1>{mindata.Name}</h1>
             <div className='iconss'>
                 <div className='choice'>
                     <h1>PRESENT</h1>
                     <button className='btn btn-present' onClick={()=>{mark('P')}}><h1><i className="fa-solid fa-check" style={{color:"black"}}></i></h1></button>
                 </div>
                 <div className='choice'>
                     <h1>ABSENT</h1>
                     <button className='btn btn-absent' onClick={()=>{mark('A')}}><h1><i className="fa-solid fa-xmark" style={{color:"black"}}></i></h1></button>
                 </div>
             </div> </>}
        {finish && <h1 style={{textAlign:"center", color:'green'}}>ATTENDANCE IS RECORDED SUCESFULLY </h1>}
    </div>
    </> );
}

export default Attendance;