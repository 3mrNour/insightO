import express from 'express';
import { register, login, forgotPassword, verifyOTP, resetPassword } from '../controllers/authController.js';
import { protect, authorizeRoles } from '../middlewares/authMiddleware.js';

const router = express.Router();

//Public routes
router.post('/register', register);
router.post('/login', login);
router.post('/forgotPassword', forgotPassword);
router.post('/verifyOTP', verifyOTP); 
router.patch('/resetPassword',resetPassword);

//Protected routes
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
