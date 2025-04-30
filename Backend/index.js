import express from "express";
import mongoose from 'mongoose';
import cors from "cors";
import bodyParser from "body-parser";
import dotenv from "dotenv";
dotenv.config();
const app=express();
import userpath from "./routes/userAPI.js";
import GeminiAPI from "./routes/travelGemini.js";
import destinationpath from "./routes/destinationAPI.js"
import adminpath from "./routes/AdminAPI.js";
import contactus from "./routes/contactAPI.js";
const PORT=4444 || process.env.PORT;

app.use(cors());
app.use(bodyParser.json());
app.use(express.urlencoded({extended:true}));
app.use('/uploads', express.static('uploads'));
app.use(express.json());
app.use("/VoyageVista",GeminiAPI);
app.use("/VoyageVista/user",userpath);
app.use("/VoyageVista/admin",adminpath);
app.use("/VoyageVista/contactus",contactus);
app.use("/VoyageVista/destinations", destinationpath);
app.listen(PORT, () => {
    console.log(`http://localhost:${PORT}`);
    mongoose.connect('mongodb://127.0.0.1:27017/travelDB').then(() => console.log('Connected to Database!'));
})