import React from 'react';
import { Link } from 'react-router-dom';
function Card({data}) {
    return (
        <Link className='card-anchor' to={`/show/${data.Roll_Number}`}  > 
        <div className='card'>
            <div>
                <img src={data.imageUrl} alt='student'/>
            </div>
            <div className='details'>
                <h1>{data.Name}</h1>
                <h2>{data.Roll_Number}</h2>
                <h2>{data.performance}%</h2>
                <h2>{data.Attendance}%</h2>
            </div>
        </div>
        </Link>
    );
}

export default Card;