import React from 'react'
import './Auth.css'
import { Link } from 'react-router-dom'

const Login = () => {
  return (
    <div style={{display:'flex',justifyContent:'center',alignItems:'center',height:'100vh'}}>
      <div className='login'>
        <h1 style={{fontSize:'2.5rem'}}>Login</h1>
        <div className='inputs' style={{marginTop:'1rem'}}>
          <label for='email'>Username or Email</label>
          <input type="text" id='email' />
        </div>
        <div className='inputs'>
          <label for='password'>Password</label>
          <input type="password" id='password' />
        </div>
        <p style={{marginTop:'1.5rem'}}>Don't have an account? <Link to={'/signup'}>Signup</Link></p>
        <button style={{fontSize:'1rem',padding:'5px 10px',marginTop:'1rem'}}>Login</button>
      </div>
    </div>
  )
}

export default Login