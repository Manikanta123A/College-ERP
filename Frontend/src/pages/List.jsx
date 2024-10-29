import React from 'react';
import Card from './Card';
import datas from '../data/data';
import { useState ,useEffect} from 'react';
import axios from 'axios'
import NavBar from '../components/NavBar';
import { Link } from 'react-router-dom';
function List() {
    let branch = localStorage.getItem('branch')
    let year = localStorage.getItem('year')
    let [data, setdata] = useState([])
    let [err, seterr] = useState(false)
    let checking = ()=>{
        console.log(localStorage.getItem('ROLE'))
        if (localStorage.getItem('ROLE') != 'T'){
            window.location.href = "http://localhost:5173/Not"
        }
    }
    useEffect(()=>{
        
        fetchdata()
    },[])
    const fetchdata = async () =>{
        try {
            const response = await axios.get(`http://localhost:8000/list`);
            setdata(response.data);
        } catch (error) {
            console.error("Error fetching products:", error);
        }
    }
    let work = (arg)=>{
        setdata(arg)
    }
    let work2 = (arg)=>{
        seterr(arg)
    }
    return ( <>
        {err && <h1 style={{textAlign:'center'}}>NO SUCH STUDENT EXIST</h1>}
         <NavBar work={work} work2={work2} fetchdata={fetchdata}/>
        <div className='List'>
            {data.map((dat)=>{
                if(dat.Year == year && dat.Branch == branch){
                    return <Card data={dat}/>}
            })}
        </div>
       <Link to="/Addpage" ><button className='btn ' style={{width:"200px"}}>ADD A NEW STUDENT</button></Link>
        </>
     );
}

export default List;