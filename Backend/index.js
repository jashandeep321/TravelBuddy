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
import packageRoutes from './routes/package.js';
const PORT=4444 || process.env.PORT;

app.use(cors({
     origin: 'https://travelbuddy-7edk.onrender.com', 
  credentials: true,
}));
app.use(bodyParser.json());
app.use(express.urlencoded({extended:true}));
app.use('/uploads', express.static('uploads'));
app.use(express.json());
app.use("/TravelBuddy", GeminiAPI);
app.use("/TravelBuddy/user", userpath);
app.use("/TravelBuddy/admin", adminpath);
app.use("/TravelBuddy/contactus", contactus);
app.use("/TravelBuddy/destinations", destinationpath);
app.use('/TravelBuddy/packages', packageRoutes);
app.listen(PORT, () => {
    console.log(`http://localhost:${PORT}`);
    // mongoose.connect('mongodb://127.0.0.1:27017/travelDB').then(() => console.log('Connected to Database!'));
    mongoose.connect(process.env.MONGO_URI).then(() => {
    console.log('Connected to MongoDB Atlas!');
}).catch((err) => {
    console.error('Error connecting to MongoDB Atlas:', err);
});
})