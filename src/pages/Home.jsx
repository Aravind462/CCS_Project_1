import React, { useEffect, useMemo, useState } from 'react'
import './Home.css'
import { getAllPersonAPI } from '../services/personServices'

const Home = () => {
    const [nameSearch,setNameSearch] = useState("");
    const [person,setPerson] = useState("");
    const [people,setPeople] = useState([]);

    const [limit,setLimit] = useState(0);

    // console.log(nameSearch);
    useEffect(()=>{
        getAllPerson();
    },[])

    const getAllPerson = async ()=>{
        try{
            const result = await getAllPersonAPI();
            if(result.status === 200){
                setPeople(result.data);
            }
        }catch(error){
            alert("Error");
            console.log(error);
        }
    }

    const getClosestDate = (date)=>{
        
    }
    
    const filteredPeople = useMemo(() => {
        return people.filter(person=>{
            return person.fullName.toLowerCase().startsWith(nameSearch.toLowerCase()) || 
            person.fathersName.toLowerCase().startsWith(nameSearch.toLowerCase()) || 
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
                        <div key={person.id} className='events'>
                            <p>{person.fullName}</p>
                            <p>Event: {new Date(person.dateOfBirth)>new Date(person.weddingAnniversary)?"Birth Day":"Wedding Anniversary"}</p>
                            <p>Date: {new Date(person.dateOfBirth)>new Date(person.weddingAnniversary)?person.dateOfBirth:person.weddingAnniversary}</p>
                        </div>
                    )).slice(limit,limit+5)
                }
            </div>
            <div style={{display:'flex',justifyContent:'end',alignItems:'center',marginTop:'0.5rem'}}>
                { limit<=0?<></>:<button style={{fontSize:'1rem',padding:'0rem 0.5rem'}} onClick={()=>setLimit(limit-5)}>Prev</button>}
                { limit+5>=people.length?<></>:<button style={{fontSize:'1rem',padding:'0rem 0.5rem',marginLeft:'0.5rem'}} onClick={()=>setLimit(limit+5)}>Next</button>}
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
                </div>
            }
        </div>
    </div>
  )
}

export default Home