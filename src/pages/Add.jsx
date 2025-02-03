import React from 'react'
import './Add.css'

const Add = () => {
  return (
    <div style={{margin:'2rem 3rem',fontSize:'1.5rem'}}>
      <h1 style={{textAlign:'center'}}>Add New User</h1>
      <div className='details' style={{marginTop:'3rem'}}>
        <div></div>
        <label htmlFor="full-name">Full Name:</label>
        <input type="text" id='full-name' />
      </div>
      <div className='details'>
        <div></div>
        <label htmlFor="fathers-name">Father's Name:</label>
        <input type="text" id='fathers-name' />
      </div>
      <div className='details'>
        <div></div>
        <label htmlFor="dateofbirth">Date Of Birth:</label>
        <input type="date" id='dateofbirth' />
      </div>
      <div className='details'>
        <div></div>
        <label htmlFor="wedding-anniversary">Wedding Anniversary:</label>
        <input type="date" id='wedding-anniversary' />
      </div>
      <div className='buttons'>
        <button style={{color:'green'}}>Submit</button>
        <button style={{color:'red'}}>Cancel</button>
      </div>
    </div>
  )
}

export default Add