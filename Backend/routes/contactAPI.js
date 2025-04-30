import express from 'express';
import Contact from '../model/contactus.js';
import { isAdmin } from '../middlewares/isAdmin.js';

const router = express.Router();

// POST: Add contact form details
router.post('/', async (req, res) => {
    try {
        const { name, email, message, subject } = req.body;

        // Validate required fields
        if (!name || !email || !message) {
            return res.status(400).json({ message: 'Name, email, and message are required.' });
        }

        // Save form details to the database
        const newContact = new Contact({
            name,
            email,
            message,
        });

        await newContact.save();
        res.status(201).json({ message: 'Contact form submitted successfully.', contact: newContact });
    } catch (error) {
        console.error('Error saving contact form:', error);
        res.status(500).json({ message: 'Error saving contact form details.' });
    }
});


router.get('/',isAdmin, async (req, res) => {
    try {
        const contacts = await Contact.find().sort({ createdAt: -1 });
        res.json(contacts);
    } catch (error) {
        console.error('Error retrieving contact forms:', error);
        res.status(500).json({ message: 'Error retrieving contact form details.' });
    }
});

export default router;
