import React, { useEffect, useMemo, useState } from 'react'
import people from '../data/people'
import { Link, useNavigate } from 'react-router-dom';
import './Home.css'

const Home = () => {
    const [nameSearch,setNameSearch] = useState("");
    const navigate = useNavigate()
    const [person,setPerson] = useState("");

    // console.log(nameSearch);

    const getClosestDate = (date)=>{
        
    }
    
    const filteredPeople = useMemo(() => {
        return people.filter(person=>{
            return person.fullName.toLowerCase().includes(nameSearch.toLowerCase()) || 
            person.fathersName.toLowerCase().includes(nameSearch.toLowerCase()) || 
            person.id.toString() === nameSearch
        });
    }, [nameSearch])
    console.log(people,filteredPeople);
    
  return (
    <div style={{padding:"2rem 3rem"}}> 
        <div>
            <h2 style={{fontSize:'2.5rem'}}>Upcoming Events</h2>
            <div className='upcoming-events'>
                {
                    people.map(person=>(
                        <div className='events'>
                            <p>{person.fullName}</p>
                            <p>Event: {new Date(person.dateOfBirth)>new Date(person.weddingAnniversary)?"Birth Day":"Wedding Anniversary"}</p>
                            <p>Date: {new Date(person.dateOfBirth)>new Date(person.weddingAnniversary)?person.dateOfBirth:person.weddingAnniversary}</p>
                        </div>
                    )).slice(0,5)
                }
            </div>
        </div>
        <div className='search-display'>
            <div className='search-section'>
                <input value={nameSearch} onChange={e=>setNameSearch(e.target.value)} type="text" className='search-bar' placeholder='Search here...'/>
                <div>
                    {
                        nameSearch?filteredPeople.map(people=>(
                            <div key={people.id} onClick={()=>setPerson(people)} className='name-suggestions'>{people.fullName}</div>
                        ))
                        :
                        <div></div>
                    }
                </div>
            </div>
            {
                person &&
                <div className='display-section'>
                    <h1 style={{textAlign:'center',marginBottom:'1rem',fontSize:'2.5rem'}}>Details</h1>
                    <p>Name: {person.fullName}</p>
                    <p>Father's Name: {person.fathersName}</p>
                    <p>DOB: {person.dateOfBirth}</p>
                    <p>Wedding Anniversary: {person.weddingAnniversary?person.weddingAnniversary:"Null"}</p>
                    <div className='edit-delete'>
                        <Link to={'/edit'} style={{textDecoration:"none"}}><button className='edit' style={{color:'green'}}>Edit</button></Link>
                        <button className='delete' style={{color:'red'}}>Delete</button>
                    </div>
                </div>
            }
        </div>
    </div>
  )
}

export default Home