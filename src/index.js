// required('dotenv').config({path:'./env'})
import dotenv from 'dotenv';
import {app} from './app.js';
import connectDB from './db/db.js';
dotenv.config({  
      path:'./env'
})
connectDB()
.then(() => {
  app.listen(process.env.PORT || 8000 , ()=>{
    console.log(`listening on ${process.env.PORT}`)
  })
}).catch((err) => {
 console.log("Faild mongodb connection !!!!",err)   
});








/*
import express from 'express';
const app = express();

async ()=>{
    try {
        await mongoose.connect(`${process.env.MONGODB_URL}/${DB_NAME}`);
        app.on('error',(error)=>{
            console.log("Error connecting to MongoDB : ",error)
        })
        app.listen(process.env.PORT,()=>{
            console.log(`app is listing on port ${process.env.PORT}`)
        })
    } catch (error) {
        console.log("error : ",error)
        throw error
    }
}*/