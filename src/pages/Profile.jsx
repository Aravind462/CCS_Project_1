import React, { useEffect, useRef, useState } from 'react'
import './Profile.css'
import { Link } from 'react-router-dom';
import { deletePersonAPI, getPersonAuthorisedAPI } from '../services/personServices';
import { SERVER_BASE_URL } from '../services/serverBaseURL';
import tempProfilePic from '../assets/profile.png';
import { addProfilePicAPI } from '../services/userServices';

const Profile = () => {
    const [people,setPeople] = useState([]);
    const [profilePreview,setProfilePreview] = useState("https://upload.wikimedia.org/wikipedia/commons/b/b1/Loading_icon.gif");
    const [showSaveButton,setShowSaveButton] = useState(false);
    const imageRef = useRef();

    useEffect(()=>{
        getAllPersonAuthorised();
        handleUserProfile();
    }, []);

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

    const userDetails = JSON.parse(sessionStorage.getItem("user"));

    const handleUserProfile = ()=>{
        if(userDetails.profilePic){
            const profilePic = `${SERVER_BASE_URL}/${userDetails.profilePic}`;
            setProfilePreview(profilePic);
        }else{
            setProfilePreview(tempProfilePic);
        }
    }

    const handleImageChange = ()=>{
        setShowSaveButton(true);
        console.log(imageRef.current.files[0]);
        const currentFile = imageRef.current.files[0];
        const currentImage = URL.createObjectURL(currentFile);
        setProfilePreview(currentImage);
    }

    const handleSubmit = async ()=>{
        const formData = new FormData();
        const currentFile = imageRef.current.files[0];
        formData.append("profilePic", currentFile);
        const token = sessionStorage.getItem("token");
        const reqHeader = {
            "Authorization": `Bearer ${token}`,
            "Content-Type":"multipart/form-data"
          }
        try{
            const result = await addProfilePicAPI(formData, reqHeader);
            if(result.status === 200){
                alert("Image uploaded successfully");
                console.log(result);
                const user = JSON.stringify(result.data.user);
                sessionStorage.setItem("user", user);
                setShowSaveButton(false);
            }
        }catch(error){
            alert("Error");
            console.log(error);
        }
    }

    const handleCancel = ()=>{
        setShowSaveButton(false);
        handleUserProfile();
    }

  return (
    <div className='profile-person'>
        <div className='profile'>
            <div className='profile-pic' onClick={()=>imageRef.current.click()}>
                <img src={profilePreview} alt="" style={{width:'100%',height:'100%'}} />
            </div>
            <input onChange={handleImageChange} ref={imageRef} type="file" hidden />
            <div className='user-details'>
                <p>Username:</p>
                <p>{userDetails.username}</p>
                <p style={{marginTop:'1rem'}}>Email:</p>
                <p>{userDetails.email}</p>
            </div>
            {
                showSaveButton &&
                <div style={{display:'flex', justifyContent:'center', alignItems:'center'}}>
                    <button onClick={handleSubmit} style={{fontSize:'1rem', padding:'0.5rem', color:'green', margin:'0rem 0.5rem'}}>Save</button>
                    <button onClick={handleCancel} style={{fontSize:'1rem', padding:'0.5rem', color:'red', margin:'0rem 0.5rem'}}>Cancel</button>
                </div>
            }
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
  )
}

export default Profile