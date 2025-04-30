import express from 'express';
import { GoogleGenerativeAI } from '@google/generative-ai';
import { isLoggedIn } from '../middlewares/isLoggedin.js';
import dotenv from 'dotenv';

dotenv.config();

const router = express.Router();

const apiKey = process.env.GEMINI_API_KEY;
if (!apiKey) {
  throw new Error('GEMINI_API_KEY is not defined in the environment variables.');
}

const genAI = new GoogleGenerativeAI(apiKey);

const model = genAI.getGenerativeModel({
  model: "gemini-1.5-flash",
});

const generationConfig = {
  temperature: 1,
  topP: 0.95,
  topK: 64,
  maxOutputTokens: 8192,
  responseMimeType: "text/plain",
};

router.post("/itinerary",async (req,res) => {
  const { destination,duration,preferences } = req.body;
  if (!destination || !duration) {
    return res.status(400).json({ error: "Destination and duration are required" });
  }
  const prompt = `Create a travel itinerary for a trip to ${destination} for ${duration} days. Consider the following preferences: ${preferences || 'No specific preferences'}.`;
  try {
    const chatSession = model.startChat({
      generationConfig,
      history: [],
    });
    
    const result = await chatSession.sendMessage(prompt);
    console.log(result.response.text());
    res.send(result.response.text());
  } catch (err) {
    console.error("Error:", err);
    res.status(500).json({ error: "An error occurred while processing the request." });
  }
});

export default router;
