import React from 'react';
import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
function ShowFee() {
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
        let response = await axios.get(`http://localhost:8000/get/fee/${Roll}`)
        console.log(response.data)
        setdatas(response.data)
    }
    return (<>
    <Link to={`/student/${Roll}`}><button className='btn'> GO BACK </button></Link>
         <h1 style={{textAlign:'center' , marginTop: "30px" , color:"green"}}> YOUR FEE PAAYMENTS</h1>
         {datas.map((dat)=>{
            return (<>
                {dat.Fee_staus == '0'? <>
                    <div className={`flexi attend`} >
                <h1>{dat.Fee_Receipt}</h1>
                <h1>{Roll}</h1>
                <h1 style={{color:"green"}}>Fee Paid</h1>
                </div></>
                
                :<></>}
             </>)
         })

         }
    </> );;
}

export default ShowFee;