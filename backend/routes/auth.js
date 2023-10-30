const express = require('express');
const router = express.Router();
const {body,validationResult} =require('express-validator');
const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const JSON_KEY = "harsha@123";

const fetchuser =require('../middleware/fetchuser');

// displays the content ROUTE 1 to create a user with hashed password and put to db   ( /api/createUser )
router.post('/createuser',[body('password','enter minimum of length 5 password').isLength({min:5}),
                body('email','enter a valid email').isEmail()],
    async (req, res) => { //if there are errors return the sepcifiic error
    try{
        const result = validationResult(req);
        const salt = await bcrypt.genSaltSync(10);
         if(result.isEmpty()){ // checks if the email is corrrect and password has minimum of 5 letters
            var hash = await bcrypt.hashSync(req.body.password, salt);
            let user=await User.findOne({email:req.body.email});
            let pass = await User.findOne({password:hash});
            

            if(user){
                return res.status(400).json({error:"sorry a user is there with this email"})
            }
            user=await User.insertMany({email:req.body.email,password:hash})
                .then(function(data){
                    console.log("Successfully added the correct data");
                    res.send({data});

                })
                .catch((err)=>{
                    console.log(err);
            console.log(user);
            })
        }
            else{ // raises when the password is not of 5 letter and email is incorrect
                res.send({error:"check for the mail and password entered",msg:[result.errors[0].msg]});
            }
        }
    catch(err){ // when there is a error in the database connectivity
        res.send(err);
    }
  })

  //Route 2 Authenticate a user using /auth/login 
  router.post('/login',[body('password','enter minimum of 5 letters').isLength({min:5}),body('email','enter a valid email').isEmail()],
        async (req,res)=>{
            try{
                const result = validationResult(req);
                if(result.isEmpty()){
                    let success=true;
                    const {email,password} = req.body;
                    let userItem= await User.findOne({email});
                    if(!userItem){
                        success=false;
                       return res.status(400).json({error:"please try to login with correct credentials"});  
                    } 
                    let passCompare = await bcrypt.compare(password,userItem.password);
                    if(!passCompare){
                        console.log(passCompare);
                        success=false;
                        return res.status(400).json({error:"please try to login with correct credentials"});
                    }
                    const userid=userItem._id; 
                    const d={ // token generation
                        id:userid
                    }
                    const token=jwt.sign(d,JSON_KEY,{expiresIn:'240s'});
                    console.log(token);
                    res.send({token,success})
                }
                else{
                    res.send({error:"check for the mail and password entered",msg:[result.errors[0].msg]});
                }
            }
            catch(err){ // when there is a error in the database connectivity
                res.send(err);
            }
        })


///Route 3  to get user login credentials POST "/auth/getuser" from token to user details except password
router.post('/getuser',fetchuser,async (req,res)=>{
    try{
        userId=req.user.id;
        const user=await User.findById(userId).select("-password"); //excludes the password while fetching the data from  the database
        res.send(user);
    }
    catch(err){ // when there is a error in the database connectivity
        res.send(err);
    }
})

module.exports=router;