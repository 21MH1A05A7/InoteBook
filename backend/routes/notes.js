const express= require('express');
const fetchuser = require('../middleware/fetchuser');
const router = express.Router();

const notes=require('../models/Notes');

/// Route 1 is to fetch the notes from the database
router.get('/fetchnotes',fetchuser,
        async (req,res)=>{
            try {
                const Note=await notes.find({user:req.user.id});
                res.send(Note);    
            } catch (error) {
                console.error(error.message);
                res.status(500).send({error:"user not found"})
            }      
})


//route to create a note and store it in database
router.post('/addnotes',fetchuser,async (req,res)=>{
    try{
        const data={
            user:req.user.id,
            title:req.body.title,
            content:req.body.content
        }
        const d = await notes.insertMany(data)
            .then(function(info){
                res.send(info);
            })
            .catch((err)=>{
                res.status(401).json({error:"There is an error in adding the data"})
            })

    } catch (error) {
        console.error(error.message);
    }
})

//route to update a field and /notes/updatenotes

router.post('/updatenotes/:id',fetchuser,
        async (req,res)=>{
            let newnote={
                title:req.body.title,
                content:req.body.content
            }
            try {
                const data = await notes.findById(req.params.id);
                if(!data){
                    res.status(500).send({error:"the notes id is wro"});
                }
                if(req.user.id !== data.user.toString()){
                    res.status(501).send({error:"the user is not same"})
                }   
                try {
                    const d = await notes.findByIdAndUpdate(req.params.id,{$set:newnote},{new:true});
                    res.send(d);    
                } catch (error) {
                    res.status(400).send({error:"Notes was not found"})
                }
                 
                
            } catch (error) {
                res.status(500).send({error:"the notes id is wrond"});
            }
})  


//route to delete a note with autentication /notes/deletenote/:id

router.delete('/deletenote/:id',fetchuser,
        async(req,res)=>{
            try {
                const note = await notes.findById(req.params.id);
                if(req.user.id!==note.user.toString()){
                    res.status(400).send({error:"user is not same"});
                }
                const d=await notes.findByIdAndDelete(req.params.id);
                console.log(d);
                const data=await notes.find({user:req.user.id});
                console.log(data);
                res.send(data);
            } catch (error) {
                console.log("error in fetching the data");
                res.status(400).send({error:"given note id is not found"});

            }
            
})





module.exports =router;