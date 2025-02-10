import React from 'react'
import { Link } from 'react-router-dom'

const Header = () => {
    const token = sessionStorage.getItem('token');
    return (
        <>
            {
                token?
                <div style={{height:"4rem",display:"flex",alignItems:"center",justifyContent:"end",paddingRight:"3rem",backgroundColor:"lightblue"}}>
                    <Link style={{textDecoration:"none",padding:"0 1rem",color:"black",fontWeight:'600'}} to={'/'}>HOME</Link>
                    <Link style={{textDecoration:"none",padding:"0 1rem",color:"black",fontWeight:'600'}} to={'/add'}>ADD NEW</Link>
                    <Link style={{textDecoration:"none",padding:"0 1rem",color:"black",fontWeight:'600'}} to={'/profile'}>PROFILE</Link>
                    <Link onClick={()=>sessionStorage.clear()} style={{textDecoration:"none",padding:"0 1rem",color:"black",fontWeight:'600'}} to={'/login'}>LOGOUT</Link>
                </div>
                :
                <div style={{height:"4rem",display:"flex",alignItems:"center",justifyContent:"end",paddingRight:"3rem",backgroundColor:"lightblue"}}>
                    <Link style={{textDecoration:"none",padding:"0 1rem",color:"black",fontWeight:'600'}} to={'/login'}>LOGIN</Link>
                    <Link style={{textDecoration:"none",padding:"0 1rem",color:"black",fontWeight:'600'}} to={'/login'}>SIGNUP</Link>
                </div>
            }
            
        </>
    )
}

export default Header