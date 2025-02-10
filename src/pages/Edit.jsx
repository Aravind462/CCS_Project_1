import React, { useEffect, useState } from 'react'
import './Add.css'
import Header from '../components/Header';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { editPersonAPI, getOnePersonAPI } from '../services/personServices';

const Edit = () => {
    const [personDetails,setPersonDetails] = useState({
      fullName: "", fathersName: "", dateOfBirth: "", weddingAnniverary: ""
    });
    console.log(personDetails);

    const navigate = useNavigate();
    
    const { id } = useParams();
    
    useEffect(()=>{
      getPersonDetails();
    }, [])

    const getPersonDetails = async ()=>{
      if(sessionStorage.getItem("token")){
        const reqHeader = {
          "Authorization": `Bearer ${sessionStorage.getItem("token")}`
        }
        try{
          const result = await getOnePersonAPI(id, reqHeader);
          if(result.status === 200){
            const { fullName, fathersName, dateOfBirth, weddingAnniverary } = result.data;
            setPersonDetails({fullName,fathersName,dateOfBirth,weddingAnniverary});
          }
        }catch(error){
          alert("Error");
          console.log(error);
        }
      }else{
        alert("You are not authorised");
      }
    }
    
    const handleSubmit = async ()=>{
      if(!sessionStorage.getItem("token")){
        alert("You are not authorised")
      }else{
        const reqHeader = {
          "Authorization": `Bearer ${sessionStorage.getItem("token")}`
        }
        const { fullName, fathersName, dateOfBirth } = personDetails;
        if(!fullName || !fathersName || !dateOfBirth){
          alert("Enter all necessary details");
        }else{
          try{
            const result = await editPersonAPI(id, personDetails, reqHeader);
            if(result.status === 200){
              alert("Updated successfully");
              navigate('/profile');
            }
          }catch(error){
            alert("Error");
            console.log(error);
          }
        }
      }
    }

  return (
    <>
      <Header/>
      <div style={{margin:'5rem 3rem',fontSize:'1.5rem'}}>
        <h1 style={{textAlign:'center'}}>Edit Person</h1>
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
          <button><Link to={'/profile'} style={{color:'red',textDecoration:'none'}}>Cancel</Link></button>
        </div>
      </div>
    </>
  )
}

export default Edit