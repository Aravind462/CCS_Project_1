import React, { useEffect, useMemo, useState } from 'react'
import './Home.css'
import { getAllPersonAPI } from '../services/personServices'

const Home = () => {
    const [nameSearch,setNameSearch] = useState("");
    const [person,setPerson] = useState("");
    const [people,setPeople] = useState([]);
    const [eventArray,setEventArray] = useState([]);

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

    const getEventArray = ()=>{
        const newArray = people.flatMap(person=>[{id:person.id,name:person.fullName,date:person.dateOfBirth,event:"Birth Day"},{id:person.id,name:person.fullName,date:person.weddingAnniversary,event:"Wedding Anniversary"}]);
        const sortedArray = newArray.map(person=>({...person, date: updateDate(person.date)})).filter(item=>item.date).sort((a,b)=>a.date - b.date).map(item=>({...item, date: item.date.toLocaleDateString()}));
        setEventArray(sortedArray);
    }

    const updateDate = (date)=>{
        if(date){
            const demoDate = new Date(date);
            const currentDate = new Date();
            
            demoDate.setYear(currentDate.getFullYear())
            if(demoDate<new Date()){
                demoDate.setYear(currentDate.getFullYear()+1)
            }
            console.log(demoDate);
            return demoDate;
        }else{
            return null;
        }
    }
    console.log(eventArray);
    
    
    useEffect(()=>{
        getEventArray();
    }, [people]);

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
                    eventArray?.map(person=>(
                        <div key={person.id} className='events'>
                            <p>{person.name}</p>
                            <p>Event: {person.event}</p>
                            <p>Date: {person.date}</p>
                        </div>
                    )).slice(limit,limit+5)
                }
            </div>
            <div style={{display:'flex',justifyContent:'end',alignItems:'center',marginTop:'0.5rem'}}>
                { limit<=0?<></>:<button style={{fontSize:'1rem',padding:'0rem 0.5rem'}} onClick={()=>setLimit(limit-5)}>Prev</button> }
                { limit+5>=eventArray.length?<></>:<button style={{fontSize:'1rem',padding:'0rem 0.5rem',marginLeft:'0.5rem'}} onClick={()=>setLimit(limit+5)}>Next</button> }
            </div>
        </div>
        <div className='search-display'>
            <div className='search-section'>
                <input value={nameSearch} onChange={e=>setNameSearch(e.target.value)} type="text" className='search-bar' placeholder='Search here...'/>
                <div>
                    {
                        nameSearch && filteredPeople.map(people=>(
                            <div key={people.id} onClick={()=>setPerson(people)} className='name-suggestions'>{people.fullName}</div>
                        ))
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