import express from 'express';
import jwt from 'jsonwebtoken';
import User from '../model/user.js';
import dotenv from 'dotenv';
dotenv.config();
const JWT_SECRET = process.env.JWT_SECRET  // Ensure this is correctly set in your environment variables


export const isAdmin = async (req, res, next) => {
  const authHeader = req.headers.authorization;
   console.log("Accessing Admin");
  if (!authHeader) {
    return res.status(401).json({ message: 'Authorization header is missing' });
  }
  
  const token = authHeader.split(' ')[1];
  
  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    const user = await User.findById(decoded.userId);
  
    if (user && user.isAdmin) {
      next(); // User is an admin, proceed to the next middleware or route handler
    } else {
      res.status(403).json({ message: 'Access denied: Not an admin' });
    }
  } catch (error) {
    res.status(401).json({ message: 'Invalid token' });
  }
};

