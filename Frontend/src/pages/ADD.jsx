import React, { useState,useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
function ADD() {
    let [params, setparams] = useState({Roll:"",Name:"", Year:"",Branch:"",Age:"",DOB:"",Gender:"",Phone_number:"",mailId:"",url:"",performance:"",Attendance:0})

    let[update, setupdate] = useState(false)
    let checking = ()=>{
        if (localStorage.getItem('ROLE') != 'A'){
            window.location.href = "http://localhost:5173/Not"
        }
    }
    useEffect(()=>{
       
        if(localStorage.getItem("Name") != undefined){
            setparams({Roll:localStorage.getItem("Roll"),Name:localStorage.getItem("Name"), Year:localStorage.getItem("Year"),Branch:localStorage.getItem("Branch"),Age:localStorage.getItem("Age"),Gender:localStorage.getItem("Gender"),Phone_number:localStorage.getItem("Phone_number"),DOB:localStorage.getItem("DOB"),mailId:localStorage.getItem("mailId"),url:localStorage.getItem("url"),performance:localStorage.getItem("performance"),Attendance:localStorage.getItem("Attendance")})

            setupdate(true)
        }

    },[])
    let clicka = (event)=>{
        setparams({...params,[event.target.id]:event.target.value})
    }
    let submitted =async  (event)=>{
        event.preventDefault()
        setparams({Roll:"",Name:"", Year:"",Branch:"",Age:"",Gender:"",Phone_number:"",DOB:"",mailId:"",url:"",performance:"",Attendance:0})
        console.log(params)
        let information = {
            Roll_Number :params.Roll,
            Name :params.Name,
            Date_of_Birth :params.DOB,
            imageUrl :params.url,
            Gender :params.Gender,
            Age: params.Age,
            phone_number: params.Phone_number,
            Mail :params.mailId,
            Attendance :params.Attendance,
            performance :params.performance,
            Branch: params.Branch,
            Year: params.Year
        }

        if (!update){
            let response = await axios.post('http://localhost:8000/student/add', information)
            window.location.href="http://localhost:5173/Home"
        }
        else{
            let response = await axios.put(`http://localhost:8000/student/update/${params.Roll}`, information)
            let keys = ['Name','Roll','Gender','mailId','Phone_Number','Age','Attendance','DOB','Branch','performance','url','Year']
            keys.forEach((key)=>{
                localStorage.removeItem(key)
            })
            window.location.href=`http://localhost:5173/show/${params.Roll}`
        }
    }
    return ( <>
     <Link to="/Home" ><button className='btn ' style={{width:"200px"}}>GO BACK</button></Link>
    <div className='signup'>
        <div className='signupBox'>
            <div>
                <form onSubmit={submitted}>
                    <div className='Name'>
                    <label htmlFor='Roll'><h1>Roll Number</h1></label>
                    <input type='text' id='Roll' value={params.Roll} placeholder='Enter The RollNumber' onChange={clicka} required />
                    <label htmlFor='Name'><h1>Name</h1></label>
                    <input type='text' id='Name' value={params.Name} placeholder='Enter The Name' onChange={clicka} required />

                    <label htmlFor='mailId'><h1>MailId</h1></label>
                    <input type='mail' id='mailId' value={params.mailId} placeholder='Enter The Mail' onChange={clicka} required />

                    <div className='input-select'>
                        <label htmlFor='Year'><h1>YEAR</h1></label>
            <select onChange={clicka} id="Year">
            {update? <option value={localStorage.getItem('Year')} selected >{localStorage.getItem('Year')}</option>:<></>}
                <option value={1} >Select the Year</option>
                <option value={1}>FIRST YEAR</option>
                <option value={2}>SECOND YEAR</option>
                <option value={3}>THIRD YEAR</option>
                <option value={4}>FOURTH YEAR</option>
            </select>
            </div>
                    <label htmlFor='Age'><h1>Age</h1></label>
                    <input type='number' id='Age' value={params.Age} placeholder='Enter The Age' onChange={clicka} required />

                    <label htmlFor='Gender'><h1>Gender</h1></label>
                    <div className='input-select'>
            <select onChange={clicka} id="Gender" >
            {update? <option value={localStorage.getItem('Gender')} selected >{localStorage.getItem('Gender')}</option>:<></>}
                <option value={"M"} >select the Gender</option>
                <option value={"M"}>M</option>
                <option value={"F"}>F</option>
            </select>
            </div>            
                    <label htmlFor='Phone_number'><h1>Phone Number</h1></label>

                    <input type='text' id='Phone_number' value={params.Phone_number} placeholder='Enter The PhoneNumber' onChange={clicka} required />
                 

                    <label htmlFor='DOB'><h1>DOB</h1></label>
                    <input type='text' id='DOB' value={params.DOB} placeholder='YYYY-MM-DD' onChange={clicka} required />

                    <label htmlFor='URL'><h1>IMAGE URL</h1></label>
                    <input type='text' id='url' value={params.url} placeholder='Enter The url' onChange={clicka} required />
                    <label htmlFor='Branch'><h1>Branch</h1></label>
                    <div className='input-select'>
            <select onChange={clicka} id="Branch" >
               {update? <option value={localStorage.getItem('Branch')} selected >{localStorage.getItem('Branch')}</option>:<></>}
                <option value={"CSE"} >Select The Branch</option>
                <option value={"MECH"}>MECH</option>
                <option value={"CSE"}>CSE</option>
                <option value={"ECE"}>ECE</option>
            </select>
            </div>                    <label htmlFor='performance'><h1>Performance</h1></label>
                    <input type='number' id='performance' value={params.performance} placeholder='Enter The Performance' onChange={clicka} required />
                    </div>
                    {!update? <button className='btn'>ADD</button> :     <button className='btn'>EDIT</button>}
                </form>
            </div>
        </div>
    </div> </>);
}

export default ADD;