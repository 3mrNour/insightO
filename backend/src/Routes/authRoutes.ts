import express from 'express';
import { register, login,forgotPassword,verifyOTP } from '../controllers/authController.js';  // Update the import path to the correct file
import { protect, authorizeRoles } from '../middlewares/authMiddleware.js';

const router = express.Router();

router.post('/register', register);
router.post('/login', login);
router.post('/forgotPassword', forgotPassword);
router.post('/verifyOTP', verifyOTP); 


router.get('/profile', protect, (req, res) => {
  res.status(200).json({
    message: 'Profile data retrieved successfully',
    user: (req as any).user
  });
});

router.get('/admin', protect, authorizeRoles('ADMIN', 'SUPER ADMIN'), (req, res) => {
  res.status(200).json({
    message: 'Welcome to the admin area',
  });
});

export default router;
