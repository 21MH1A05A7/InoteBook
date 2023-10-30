import React, { useState } from 'react'
import { Link, json } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'

const Signup = () => {
  const navigate=useNavigate();

  const [details,setdetails] =useState({email:'',password:''})

  const handleChange=(e)=>{
    setdetails({...details,[e.target.name]:e.target.value})
  }

  const [confpassword,setconf]=useState('');
  const handleconf=(e)=>{
    setconf(e.target.value);
  }

  const handleClick=async (e)=>{
    e.preventDefault();
    const response= await fetch('http://localhost:5000/auth/createuser',{
      method:"POST",
      headers:{
        "content-type":"application/json"
      },body:JSON.stringify(details)
    })
    const json = await response.json();
    console.log(json);
    
    try {
      const det=json.data[0];
      navigate('/login');
    } catch (error) {
        alert("The user already exists");
        navigate('/signup');
    }
  }

  return (
<div className='container'>
        <h1>Signup</h1>
        <form className='block'>
            <label>Email</label>
            <input required type="email" className='block' onChange={handleChange} value={details.email} name='email'/>
            <label>Password</label>
            <input required type="password" className='block'onChange={handleChange} value={details.password} name='password'/>
            <label>Confirm Password</label>
            <input required type="password" className='block'onChange={handleconf} value={confpassword}/>
            <Link to="/login"><button className="btn btn-primary" >Login</button></Link>
            <Link to="/signup"><button type="submit" className="btn btn-primary" onClick={handleClick}>SignUp</button></Link>
        </form>
    </div>
  )
}

export default Signup
