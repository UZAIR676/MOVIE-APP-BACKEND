import express from 'express';
import cors from 'cors';

import dotenv from 'dotenv';
import { connectDB } from './Confiq/DB.js';
import userRouter from './Routes/UserRouters.js';
import errorHandler from "./Middlewares/errorMiddleware.js"





dotenv.config();





const app = express();
app.use(cors());

app.use(express.json());







connectDB();
app.get("/",(req,res)=>{
    res.send("api is running ")
})










app.use("/api/users", userRouter);
app.use(errorHandler);
const PORT = process.env.PORT || 5000;
app.listen(PORT,()=>{
    console.log(`server is running at http://localhost:${PORT}`)}
);

