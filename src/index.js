// required('dotenv').config({path:'./env'})
import dotenv from 'dotenv';
import mongoose from 'mongoose';

import connectDB from './db/db.js';
dotenv.config({  
      path:'./env'
})
connectDB()








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