const express=require("express")
const app=express();
app.use(express.json());

const connectToMongo = require('./db')
const port = 5000;
const cors = require('cors')
app.use(cors())

///connection to mongo
connectToMongo();



app.use('/auth',require('./routes/auth'))
app.use('/notes',require('./routes/notes'))



app.listen(port,()=>{
    console.log("Listening to port 5000");
})
