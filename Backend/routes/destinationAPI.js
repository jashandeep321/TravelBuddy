import express from 'express';
import multer from 'multer';
import Destination from '../model/destination.js';
import { isAdmin } from '../middlewares/isAdmin.js';
import { isLoggedIn } from '../middlewares/isLoggedin.js';

const router = express.Router();

// Multer configuration
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/'); // Directory to save uploaded images
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + '-' + file.originalname); // Unique filename
  },
});

// File filter for images
const fileFilter = (req, file, cb) => {
  if (file.mimetype.startsWith('image/')) {
    cb(null, true); // Accept file
  } else {
    cb(new Error('File must be an image'), false); // Reject file
  }
};

const upload = multer({ storage, fileFilter });

// Routes

// Get all destinations
router.get('/', async (req, res) => {
  try {
    const destinations = await Destination.find();
    res.json(destinations);
  } catch (err) {
    res.status(500).json({ message: 'Error retrieving destinations.' });
  }
});

// Get destination by ID
router.get('/:id', isLoggedIn, async (req, res) => {
  try {
    const destination = await Destination.findById(req.params.id);
    if (!destination) {
      return res.status(404).json({ message: 'Destination not found.' });
    }
    res.json(destination);
  } catch (error) {
    res.status(500).json({ message: 'Error retrieving destination.' });
  }
});

// Add a new destination with image upload
router.post('/', isAdmin, upload.single('image'), async (req, res) => {
  try {
    const newDestination = new Destination({
      ...req.body,
      image: req.file ? req.file.path : null, // Save image path in DB
    });
    await newDestination.save();
    res.status(201).json(newDestination);
  } catch (error) {
    res.status(500).json({ message: 'Error adding destination.' });
  }
});

// Update a destination with image upload
router.put('/:id', isAdmin, upload.single('image'), async (req, res) => {
  try {
    const updateData = { ...req.body };
    if (req.file) {
      updateData.image = req.file.path; // Update image path if a new image is uploaded
    }
    const updatedDestination = await Destination.findByIdAndUpdate(req.params.id, updateData, { new: true });
    if (!updatedDestination) return res.status(404).json({ message: 'Destination not found.' });
    res.json(updatedDestination);
  } catch (error) {
    res.status(500).json({ message: 'Error updating destination.' });
  }
});

// Delete a destination
router.delete('/:id', isAdmin, async (req, res) => {
  try {
    const deletedDestination = await Destination.findByIdAndDelete(req.params.id);
    if (!deletedDestination) return res.status(404).json({ message: 'Destination not found.' });
    res.json({ message: 'Destination deleted successfully.' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting destination.' });
  }
});

export default router;
