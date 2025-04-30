import express from 'express';
import { isAdmin } from '../middlewares/isAdmin.js';
import User from '../model/user.js';

const router = express.Router();

// Admin Dashboard
router.get('/admin-dashboard', isAdmin, (req, res) => {
    res.status(200).json({ message: 'Welcome to the Admin Dashboard!' });
});

// Get All Users
router.get('/allusers', isAdmin, async (req, res) => {
    try {
        const users = await User.find();
        res.status(200).json(users);
    } catch (error) {
        res.status(500).json({ message: 'Error retrieving users', error });
    }
});

// Delete a User
router.delete('/user/:id', isAdmin, async (req, res) => {
    try {
        const user = await User.findByIdAndDelete(req.params.id);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.status(200).json({ message: 'User deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error deleting user', error });
    }
});
export default router;