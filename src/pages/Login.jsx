import React, { useState } from 'react'
import './Auth.css'
import { Link, useNavigate } from 'react-router-dom'
import { loginAPI } from '../services/userServices';

const Login = () => {
  const [loginDetails, setLoginDetails] = useState({
    email: "",
    password: ""
  });
  console.log(loginDetails);

  const navigate = useNavigate();
  
  const handleLogin = async ()=>{
    const { email, password } = loginDetails;
    if(!email || !password){
      alert("Enter all details");
    }else{
      try{
        const result = await loginAPI(loginDetails);
        if(result.status === 200){
          console.log(result.data.token);
          console.log(result.data.user);
          sessionStorage.setItem("token", result.data.token);
          sessionStorage.setItem("user", JSON.stringify(result.data.user));
          navigate('/');
        }
      }catch(error){
        if(error.status === 400){
          alert("Incorrect email or password");
        }else{
          alert("Error");
          console.log(error);
        }
      }
    }
  }

  return (
    <div style={{display:'flex',justifyContent:'center',alignItems:'center',height:'100vh'}}>
      <div className='login'>
        <h1 style={{fontSize:'2.5rem'}}>Login</h1>
        <div className='inputs' style={{marginTop:'1rem'}}>
          <label for='email'>Username or Email</label>
          <input value={loginDetails.email} onChange={e=>setLoginDetails({...loginDetails, email: e.target.value})} type="text" id='email' />
        </div>
        <div className='inputs'>
          <label for='password'>Password</label>
          <input value={loginDetails.password} onChange={e=>setLoginDetails({...loginDetails, password: e.target.value})} type="password" id='password' />
        </div>
        <p style={{marginTop:'1.5rem'}}>Don't have an account? <Link to={'/signup'}>Signup</Link></p>
        <button onClick={handleLogin} style={{fontSize:'1rem',padding:'5px 10px',marginTop:'1rem'}}>Login</button>
      </div>
    </div>
  )
}

export default Login