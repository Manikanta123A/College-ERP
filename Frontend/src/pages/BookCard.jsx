import React from 'react';
import { useState } from 'react';
import axios from 'axios'
import { Link } from 'react-router-dom';
function BookCard({data , fetchbooks}) {
    let [number,isnumber] = useState("")
    let submitted = async (event)=>{
        isnumber("")
        event.preventDefault()
        let currentDate = new Date(Date.now()).toISOString().split('T')[0]; // Convert to ISO string
        // Dates = Column(Date)
        // Roll_Number = Column(String, ForeignKey('Students.Roll_Number'), index=True)
        // Book_id = Column(Integer,ForeignKey('books.id'), index= True)
        // Book_Name = Column(String)
        // Status = Column(String)

        let response ={
            Dates: new Date(Date.now()).toISOString().split('T')[0],
            Roll_Number: number,
            Book_id : data.id,
            Book_Name:data.Name,
            Status:'pending',
        }
        axios.post("http://localhost:8000/Library", response).then((res)=>{
            console.log(res.data)
            axios.get(`http://localhost:8000/decrement/${data.id}`).then(()=>{
                fetchbooks()
            })
        })
        .catch((err)=>{
            console.log(err)
        })
    }
    return ( 
        <div className='card'>
            <Link className='card-anchor' to={`/ShowBook/${data.id}`}  > 
            <div>
                <img src={data.bookUrl} alt='student'/>
            </div>
            </Link> 
            <div className='details'>
                <h1>{data.Name}</h1>
                {data.Number_of_books == 0 ?  <h1>NO BOOKS LEFT</h1>:<h1>{data.Number_of_books} Books Left</h1>}
                {data.Number_of_books ==0 ? <></>:<form onSubmit={submitted} className='Book-input'>
                    <input  style={{height:"40px", width:"200px"}} placeholder='Enter The RollNumber' value={number} onChange={(e)=>isnumber(e.target.value)} required/>
                    <button className='btn'>GIVE</button>
                </form>
}
            </div>
        </div>);
}
export default BookCard;