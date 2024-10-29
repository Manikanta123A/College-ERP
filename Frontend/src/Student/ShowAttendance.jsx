import React from 'react';
import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
function ShowAttendance() {
    let {Roll} = useParams()
    let [datas, setdatas] = useState([])
    let checking = ()=>{
        if (localStorage.getItem('ROLLNUMBER') != Roll){
            window.location.href = "http://localhost:5173/Not"
        }
    }
    useEffect(()=>{
        checking()
        fetchdata()
    },[])
    let fetchdata =async  () =>{
        let response = await axios.get(`http://localhost:8000/get/attendance/${Roll}`)
        console.log(response.data)
        setdatas(response.data)
    }
    return (<>
    <Link to={`/student/${Roll}`}><button className='btn'> GO BACK </button></Link>
         <h1 style={{textAlign:'center' , marginTop: "30px" , color:"green"}}> YOUR Attendance</h1>
         <div className='flexi attend' >
                <h1>Date</h1>
                <h1>Remark</h1>
             </div>
         {datas.map((dat)=>{
            return ( <div className={`flexi attend ${dat.Remark}`} >
                <h1>{dat.Dates}</h1>
                <h1>{dat.Remark}</h1>
             </div>)
         })

         }
    </> );
}

export default ShowAttendance;