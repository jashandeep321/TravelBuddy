import jwt from 'jsonwebtoken';
import User from '../model/user.js'; 
import dotenv from 'dotenv';
dotenv.config();

const JWT_SECRET = process.env.JWT_SECRET || 'your_jwt_secret';

export const isLoggedIn = async (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ message: 'Authorization header is missing or malformed' });
  }

  const token = authHeader.split(' ')[1];

  if (!token) {
    return res.status(401).json({ message: 'Token is missing' });
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    // console.log("Decoded token:", decoded);

    const userId = decoded.userId || decoded._id;
    if (!userId) {
      return res.status(401).json({ message: 'Invalid token payload: missing userId or _id' });
    }

    const user = await User.findById(userId);
    if (!user) {
      return res.status(401).json({ message: 'User does not exist' });
    }

    req.user = user;
    next();
  } catch (error) {
    return res.status(401).json({ message: 'Invalid or expired token' });
  }
};
