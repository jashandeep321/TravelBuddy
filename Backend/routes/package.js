import express from 'express';
import Package from '../model/package.js'; // your Package model
import { isAdmin } from '../middlewares/isAdmin.js';
import { isLoggedIn } from '../middlewares/isLoggedin.js';

const router = express.Router();

// Create a new travel package (Admin only)
router.post('/', isAdmin, async (req, res) => {
  try {
    const newPackage = new Package({ ...req.body });
    await newPackage.save();
    res.status(201).json(newPackage);
  } catch (error) {
    res.status(500).json({ message: 'Error creating travel package.', error: error.message });
  }
});

// Get all packages
router.get('/', async (req, res) => {
  try {
    const packages = await Package.find().populate('destination'); // populate destination info
    res.status(200).json(packages);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching packages.', error: error.message });
  }
});

// Get a single package by slug
router.get('/slug/:slug', async (req, res) => {
  try {
    const travelPackage = await Package.findOne({ slug: req.params.slug }).populate('destination');
    if (!travelPackage) return res.status(404).json({ message: 'Package not found.' });
    res.json(travelPackage);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching package.', error: error.message });
  }
});

// Update a package (Admin only)
router.put('/:id', isAdmin, async (req, res) => {
  try {
    const updated = await Package.findByIdAndUpdate(req.params.id, { ...req.body }, { new: true });
    if (!updated) return res.status(404).json({ message: 'Package not found.' });
    res.json(updated);
  } catch (error) {
    res.status(500).json({ message: 'Error updating package.', error: error.message });
  }
});

// Delete a package (Admin only)
router.delete('/:id', isAdmin, async (req, res) => {
  try {
    const deleted = await Package.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ message: 'Package not found.' });
    res.json({ message: 'Package deleted successfully.' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting package.', error: error.message });
  }
});

// Bulk insert (for dev/testing)
router.post('/bulk', async (req, res) => {
  try {
    const inserted = await Package.insertMany(req.body);
    res.status(201).json({ message: 'Bulk packages added!', count: inserted.length });
  } catch (error) {
    res.status(500).json({ message: 'Bulk insertion failed.', error: error.message });
  }
});

export default router;
