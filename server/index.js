import express from 'express'
import mongoose from 'mongoose'
import dotenv from 'dotenv'
import authRoutes from './routes/auths.js';
import userRoutes from './routes/users.js';
import videoRoutes from './routes/videos.js';
import commentRoutes from './routes/comments.js';
import cookieParser from 'cookie-parser';

dotenv.config();

const connect = ()=>{
    mongoose.connect(process.env.MONGO)
    .then(()=>{console.log("connected to db")})
    .catch(err=>{throw err})
}

const app = express();

app.use(cookieParser());
app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/user", userRoutes);
app.use("/api/video", videoRoutes);
app.use("/api/comment", commentRoutes);

app.use((err,req,res,next)=>{
    const status = err.status || 500;
    const message = err.message || "something went wrong!";
    return res.status(status).send({
        success:false,
        status,
        message
    })
});

app.listen(8800, ()=>{
    connect();
    console.log("connected to server!");
})