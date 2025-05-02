import express from 'express';
import multer from 'multer';
import Destination from '../model/destination.js';
import { isAdmin } from '../middlewares/isAdmin.js';
import { isLoggedIn } from '../middlewares/isLoggedin.js';

const router = express.Router();

router.post('/', isAdmin, async (req, res) => {
try {
  const newDestination = new Destination({ ...req.body });
  await newDestination.save();
  res.status(201).json(newDestination);
} catch (error) {
  res.status(500).json({ message: 'Error adding destination.', error: error.message });
}
});


// Get all destinations
router.get('/', async (req, res) => {
  try {
    const destinations = await Destination.find();
    res.status(200).json(destinations);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching destinations.', error: error.message });
  }
});


router.put('/:id', isAdmin, async (req, res) => {
  try {
    const updatedDestination = await Destination.findByIdAndUpdate(
      req.params.id,
      { ...req.body },
      { new: true }
    );

    if (!updatedDestination) return res.status(404).json({ message: 'Destination not found.' });
    res.json(updatedDestination);
  } catch (error) {
    res.status(500).json({ message: 'Error updating destination.', error: error.message });
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

router.get('/slug/:slug', async (req, res) => {
  try {
    const destination = await Destination.findOne({ slug: req.params.slug });
    if (!destination) return res.status(404).json({ message: 'Destination not found' });
    res.status(200).json(destination);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching destination.', error: error.message });
  }
});


// TEMPORARY: Bulk insert destinations (no auth, no image upload)
router.post('/bulk', async (req, res) => {
  try {
    const destinations = await Destination.insertMany(req.body); // expects array
    res.status(201).json({ message: 'Bulk destinations added!', count: destinations.length });
  } catch (error) {
    res.status(500).json({ message: 'Error during bulk insertion.', error: error.message });
  }
});

export default router;


