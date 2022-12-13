import dotenv from 'dotenv';
dotenv.config();
import express from 'express';
import cors from 'cors';
import mongoose from './config/connectDB.js';
import userRoutes from './routers/userRouter.js'
const app = express();
const port= process.env.PORT;

//cors policy
app.use(cors());
app.use(express.json());
app.use('/api/user',userRoutes);
app.get('/',(req,res)=>{
    res.send('hello jwt ')
})



app.listen(port,()=>{
    console.log(`server is listening on port no ${port}`);
})