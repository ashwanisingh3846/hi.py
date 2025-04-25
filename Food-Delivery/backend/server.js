dotenv.config();
import express from 'express'
import dotenv from 'dotenv'
import cors from 'cors'
import connectDB from './config/db.js';
const PORT = 8080;
import foodRouter from './routes/foodRoute.js';
const app = express();

app.use(express.json());
app.use(cors());

app.use("/api/food" , foodRouter);
app.use("/images", express.static("uploads"));
// db connection
connectDB();

app.listen(PORT,()=>{
    console.log(`Server is running on port ${PORT}`);
})



