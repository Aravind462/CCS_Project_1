import React from 'react'
import { Link } from 'react-router-dom'
import './Auth.css'

const Signup = () => {
  return (
    <div style={{display:'flex',justifyContent:'center',alignItems:'center',height:'100vh'}}>
      <div className='signup'>
        <h1 style={{fontSize:'2.5rem'}}>Sign up</h1>
        <div className='inputs' style={{marginTop:'1rem'}}>
          <label for='name'>Username</label>
          <input type="text" id='name' />
        </div>
        <div className='inputs'>
          <label for='email'>Email</label>
          <input type="text" id='email' />
        </div>
        <div className='inputs'>
          <label for='password'>Password</label>
          <input type="password" id='password' />
        </div>
        <p style={{marginTop:'1.5rem'}}>Already have an account? <Link to={'/login'}>Login</Link></p>
        <button style={{fontSize:'1rem',padding:'5px 10px',marginTop:'1rem'}}>Sign up</button>
      </div>
    </div>
  )
}

export default Signup