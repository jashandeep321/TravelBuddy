import express from 'express';
import User from '../model/user.js'; 
import bcrypt from 'bcrypt';
import dotenv from 'dotenv';
dotenv.config();
const saltRounds = 10;
import jwt from 'jsonwebtoken';
const router = express.Router();
const JWT_SECRET = process.env.JWT_SECRET;
// Register a new user
router.post("/register", async (req, res) => {
    try {
        const { email, username, password } = req.body;

        // Check if the user already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: "User already exists with this email." });
        }

        // Hash the password
        const hash = await bcrypt.hash(password, saltRounds);

        // Create a new user
        const user = new User({ email, username, password: hash });
        await user.save();

        res.status(201).json({ message: "User registered successfully!" });
    } catch (error) {
        console.error("Error registering user:", error);
        res.status(500).json({ message: "Server error during registration." });
    }
});

// Login a user
router.post("/login", async (req, res) => {
    try {
        const { email, password } = req.body;

        // Find the user by email
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: "Invalid email or password." });
        }

        // Compare the password
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: "Invalid email or password." });
        }
        const token = jwt.sign({ userId: user._id}, JWT_SECRET, { expiresIn: '1h' });
        console.log(token);
       
        res.status(200).json({ message: "Login successful!" ,token});
    } catch (error) {
        console.error("Error logging in user:", error);
        res.status(500).json({ message: "Server error during login." });
    }
});

export default router;
