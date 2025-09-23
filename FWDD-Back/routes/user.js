import express from 'express';
import { 
    register,
    login,
    getProfile,
    updateProfile,
    logout
} from '../controllers/user.js';

const router = express.Router();

// Authentication routes
router.post('/register', register);
router.post('/login', login);
router.post('/logout', logout);

// Profile routes
router.get('/profile', getProfile);
router.put('/profile', updateProfile);

export default router; 