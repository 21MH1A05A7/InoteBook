const jwt = require('jsonwebtoken');
const JSON_KEY = "harsha@123";

// TO FETCH THE USER id FROM THE TOKEN GIVEN
const fetchuser = async (req,res,next)=>{
    const token = await req.header('auth-token');
    console.log(token);
    if(!token){
        console.log("incorrect");
    }
    try {
        const data = await jwt.verify(token,JSON_KEY);
        console.log(data);
        req.user=data;
        console.log(req.user);
        next();
        
    } catch (error) {
        res.status(401).json({error:"error has occured"})
    }
    
}


module.exports = fetchuser;