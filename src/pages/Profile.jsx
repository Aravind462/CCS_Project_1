import React, { useEffect, useState } from 'react'
import './Profile.css'
import Header from '../components/Header';
import { Link } from 'react-router-dom';
import { deletePersonAPI, getPersonAuthorisedAPI } from '../services/personServices';

const Profile = () => {
    const [people,setPeople] = useState([]);
    const [changePasswordButton,setChangePasswordButton] = useState(false);
    const [userDetails,setUserDetails] = useState({
        username: "John Doe",
        email: "johndoe@gmail.com"
    });

    useEffect(()=>{
        getAllPersonAuthorised();
    }, []);

    const [passwordChange,setPasswordChange] = useState({
        currentPassword: "",
        newPassword: "",
        confirmPassword: ""
    });
    console.log(passwordChange);
    
    const handlePasswordCancel = ()=>{
        setChangePasswordButton(false);
        setPasswordChange({
            currentPassword: "",
            newPassword: "",
            confirmPassword: ""
        });
    }

    const getAllPersonAuthorised = async ()=>{
        if(sessionStorage.getItem("token")){
            const reqHeader = {
                "Authorization": `Bearer ${sessionStorage.getItem("token")}`
            }
            try{
                const result = await getPersonAuthorisedAPI(reqHeader);
                if(result.status === 200){
                    setPeople(result.data);
                }
            }catch(error){
                alert("Error");
                console.log(error);
            }
        }else{
            alert("You are not authorised");
        }
    }

    const handleDelete = async (id)=>{
        if(sessionStorage.getItem("token")){
            const reqHeader = {
                "Authorization": `Bearer ${sessionStorage.getItem("token")}`
            }
            try{
                const result = await deletePersonAPI(id, reqHeader);
                if(result.status === 200){
                    getAllPersonAuthorised();
                }
            }catch{
                alert("Error");
                console.log(error);
            }
        }else{
            alert("You are not authorised");
        }
    }

  return (
    <>
        <Header/>
        <div className='profile-person'>
            <div className='profile'>
                <label htmlFor='img-file' className='profile-pic'>
                    <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRVA_HrQLjkHiJ2Ag5RGuwbFeDKRLfldnDasw&s" alt="" style={{width:'100%',height:'100%'}} />
                    <input type="file" id='img-file' />
                </label>
                <div className='user-details'>
                    <p>Username:</p>
                    <p>{userDetails.username}</p>
                    <p style={{marginTop:'1rem'}}>Email:</p>
                    <p>{userDetails.email}</p>
                </div>
            </div>
            <div className='person-details'>
                <h1 style={{marginBottom:'1rem'}}>Entries</h1>
                {
                    people.length>0?people.map(person=>(
                        <div key={person.id}>
                            <p style={{fontSize:'1.5rem'}}>{person.fullName}</p>
                            <div style={{display:'flex', alignItems:'center'}}>
                                <Link to={`/edit/${person.id}`}><button style={{padding:'0.2rem',fontSize:'1rem',margin:'0rem 0.5rem',color:'green',width:'4rem'}}>Edit</button></Link>
                                <button onClick={()=>handleDelete(person.id)} style={{padding:'0.2rem',fontSize:'1rem',margin:'0rem 0.5rem',color:'red',width:'4rem'}}>Delete</button>
                            </div>
                        </div>
                    ))
                    :
                    <div style={{color:'red'}}>No data found !!</div>
                }
            </div>
        </div>
    </>
  )
}

export default Profile