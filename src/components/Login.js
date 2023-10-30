import React,{useState} from "react"
import { useNavigate, Link } from "react-router-dom";


const Login = () => {
  const [email,setmail] = useState("");
  const [password,setpass] = useState("");

  const history = useNavigate();
  //handle 
  const handleChange=(e)=>{
    setmail(e.target.value);
  }  
  const handleChange2=(e)=>{
    setpass(e.target.value);
  }

  const handleClick=(async (e)=>{
    e.preventDefault();
    const response=await fetch("http://localhost:5000/auth/login",{
      method:'POST',
      headers:{
          'Content-Type':'application/json',
      },
      body:JSON.stringify({email,password})
  });
    const json = await response.json();
    const tok = JSON.stringify(json);
    console.log(tok);
    if(json.success){
      localStorage.setItem("token",tok)
      const token=localStorage.getItem("token");
      const tokenObject = JSON.parse(token);
        const tokenValue = tokenObject.token;
        console.log(tokenValue);
      history('/');
    }
    setmail("");
    setpass("");
  })
  return (
    <div className='container'>
        <h1>Login</h1>
        <form className='block'>
            <label>Email</label>
            <input required type="email" className='block' onChange={handleChange} value={email}/>
            <label>Password</label>
            <input required type="password" className='block'onChange={handleChange2} value={password}/>
            <button type="submit" className="btn btn-primary"  onClick={handleClick}>Login</button>
            <Link to="/signup"><button type="submit" className="btn btn-primary">SignUp</button></Link>
        </form>
    </div>
  )
}

export default Login
