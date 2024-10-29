import React from 'react';
import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
function ShowLibrary() {
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
        let response = await axios.get(`http://localhost:8000/get/library/${Roll}`)
        console.log(response.data)
        setdatas(response.data)
    }
    return (<>
    <Link to={`/student/${Roll}`}><button className='btn'> GO BACK </button></Link>
         <h1 style={{textAlign:'center' , marginTop: "30px" , color:"green"}}> YOUR LIBRARY RECORDS</h1>
       
         {datas.map((dat)=>{
            return ( <div className={`flexi attend ${dat.Remark}`} >
                <h1>{dat.Book_id}</h1>
                <h1>{dat.Book_Name}</h1>
                <h1>{dat.Status}</h1>
             </div>)
         })

         }
    </> );
}

export default ShowLibrary;


