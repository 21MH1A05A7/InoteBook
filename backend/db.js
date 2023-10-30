const mongoose = require('mongoose');
const mongo = 'mongodb://127.0.0.1:27017/';

const connectToMongo = ()=>{
    mongoose.connect(mongo, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      })
        .then(function(data){
            console.log("Connected to mongo");
        })
            
        .catch((err)=>{
            console.log(err);
        })
        
}

module.exports=connectToMongo;

