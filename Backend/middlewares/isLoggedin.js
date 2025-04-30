import jwt from 'jsonwebtoken';
import User from '../model/user.js'; 
import dotenv from 'dotenv';
dotenv.config();
const JWT_SECRET = process.env.JWT_SECRET || 'your_jwt_secret'; 

// Middleware to check if the user is logged in
export const isLoggedIn = async (req, res, next) => {
  const authHeader = req.headers.authorization;
  
  if (!authHeader) {
    return res.status(401).json({ message: 'Authorization header is missing' });
  }

  const token = authHeader.split(' ')[1]; // Extract the token from 'Bearer <token>'

  if (!token) {
    return res.status(401).json({ message: 'Token is missing' });
  }

  try {
    // Verify the token
    const decoded = jwt.verify(token, JWT_SECRET);
    
    // Optional: Verify if the user still exists in the database
    const user = await User.findById(decoded.userId);
    if (!user) {
      return res.status(401).json({ message: 'User does not exist' });
    }

    // Attach the user to the request object so the next middleware/route can use it
    req.user = user;

    // Proceed to the next middleware or route handler
    next();
  } catch (error) {
    return res.status(401).json({ message: 'Invalid or expired token' });
  }
};