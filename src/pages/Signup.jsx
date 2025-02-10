import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import './Auth.css'
import { signupAPI } from '../services/userServices'

const Signup = () => {
  const [signupDetails,setSignupDetails] = useState({
    username: "",
    email: "",
    password: ""
  });
  // console.log(signupDetails);

  const navigate = useNavigate();

  const handleSignup = async ()=>{
    const { username, email, password } = signupDetails;
    console.log(username, email, password);
    
    if(!username || !email || !password){
      alert("Enter all necessary details");
    }else{
      try{
        const result = await signupAPI(signupDetails);
        if(result.status === 200){
          console.log(result);
          alert("Account created successfully");
          navigate('/login');
        }
      }catch(error){
        if(error.status === 400){
          alert("Account already in use")
        }else{
          alert("Error");
          console.log(error);
        }
      }
    }
  }

  return (
    <div style={{display:'flex',justifyContent:'center',alignItems:'center',height:'100vh'}}>
      <div className='signup'>
        <h1 style={{fontSize:'2.5rem'}}>Sign up</h1>
        <div className='inputs' style={{marginTop:'1rem'}}>
          <label for='name'>Username</label>
          <input value={signupDetails.username} onChange={e=>setSignupDetails({...signupDetails,username: e.target.value})} type="text" id='name' />
        </div>
        <div className='inputs'>
          <label for='email'>Email</label>
          <input value={signupDetails.email} onChange={e=>setSignupDetails({...signupDetails,email: e.target.value})} type="text" id='email' />
        </div>
        <div className='inputs'>
          <label for='password'>Password</label>
          <input value={signupDetails.password} onChange={e=>setSignupDetails({...signupDetails,password: e.target.value})} type="password" id='password' />
        </div>
        <p style={{marginTop:'1.5rem'}}>Already have an account? <Link to={'/login'}>Login</Link></p>
        <button onClick={handleSignup} style={{fontSize:'1rem',padding:'5px 10px',marginTop:'1rem'}}>Sign up</button>
      </div>
    </div>
  )
}

export default Signup