import React, { useState } from 'react'
import './Add.css'
import Header from '../components/Header';
import { addPersonAPI } from '../services/personServices';
import { useNavigate } from 'react-router-dom';

const Add = () => {
  const [personDetails,setPersonDetails] = useState({
    fullName: "", fathersName: "", dateOfBirth: "", weddingAnniverary: ""
  });
  console.log(personDetails);

  const navigate = useNavigate();
  
  const handleSubmit = async ()=>{
    const { fullName, fathersName, dateOfBirth } = personDetails;
    const reqHeader = {
      "Authorization": `Bearer ${sessionStorage.getItem("token")}`
    }
    if(!fullName || !fathersName || !dateOfBirth){
      alert("Enter all necessary details");
    }else{
      try{
        const result = await addPersonAPI(personDetails, reqHeader);
        if(result.status === 200){
          alert("Data added successfully");
          navigate('/');
        }
      }catch(error){
        if(error.status === 400){
          alert("Enter all necessary details");
        }else if(error.status === 401){
          alert("You are not authorized");
        }else{
          alert("Error");
          console.log(error);
        }
      }
    }
  }

  const handleReset = ()=>{
    setPersonDetails({
      fullName: "", fathersName: "", dateOfBirth: "", weddingAnniverary: ""
    });
  }

  return (
    <>
      <Header/>
      <div style={{margin:'5rem 3rem',fontSize:'1.5rem'}}>
        <h1 style={{textAlign:'center'}}>Add New Person</h1>
        <div className='details' style={{marginTop:'3rem'}}>
          <div></div>
          <label htmlFor="full-name">Full Name:</label>
          <input value={personDetails.fullName} onChange={(e)=>setPersonDetails({...personDetails, fullName: e.target.value})} type="text" id='full-name' />
        </div>
        <div className='details'>
          <div></div>
          <label htmlFor="fathers-name">Father's Name:</label>
          <input value={personDetails.fathersName} onChange={(e)=>setPersonDetails({...personDetails, fathersName: e.target.value})} type="text" id='fathers-name' />
        </div>
        <div className='details'>
          <div></div>
          <label htmlFor="dateofbirth">Date Of Birth:</label>
          <input value={personDetails.dateOfBirth} onChange={(e)=>setPersonDetails({...personDetails, dateOfBirth: e.target.value})} type="date" id='dateofbirth' />
        </div>
        <div className='details'>
          <div></div>
          <label htmlFor="wedding-anniversary">Wedding Anniversary:</label>
          <input value={personDetails.weddingAnniverary} onChange={(e)=>setPersonDetails({...personDetails, weddingAnniverary: e.target.value})} type="date" id='wedding-anniversary' />
        </div>
        <div className='buttons'>
          <button style={{color:'green'}} onClick={handleSubmit}>Submit</button>
          <button style={{color:'red'}} onClick={handleReset}>Reset</button>
        </div>
      </div>
    </>
  )
}

export default Add