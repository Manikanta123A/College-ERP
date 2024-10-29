import React, { useEffect, useState } from 'react';
function SelectionPage() {
    let [year, setyear] = useState(1)
    let [branch, setbranch] = useState("")
    let selected = ()=>{
        localStorage.clear()
        localStorage.setItem('year',year)
        localStorage.setItem('branch',branch)
        window.location.href= "http://localhost:5173/Home"
    }
    let checking = ()=>{
        if (localStorage.getItem('ROLE') != 'T'){
            window.location.href = "http://localhost:5173/Not"
        }
    }
    useEffect(()=>{
       
    },[])
    return ( <div className='selection'>
        <div className='selection-s'>
            <h1>SELECT THE YEAR</h1>
            <div className='input-select'>
            <select onChange={(e)=>{setyear(e.target.value)}}>
                <option value={1} >Select the Year</option>
                <option value={1}>FIRST YEAR</option>
                <option value={2}>SECOND YEAR</option>
                <option value={3}>THIRD YEAR</option>
                <option value={4}>FOURTH YEAR</option>
            </select>
            </div>
            <h1>SELCT THE BRANCH</h1>
            <div className='input-select'>
            <select onChange={(e) =>{setbranch(e.target.value)}}>
                <option value={"CSE"} >Select The Branch</option>
                <option value={"MECH"}>MECH</option>
                <option value={"CSE"}>CSE</option>
                <option value={"ECE"}>ECE</option>
            </select>
            </div>
            <button onClick={selected} className='btn btn-signup btn-select'>SELCET</button>
        </div>
    </div> );
}

export default SelectionPage;