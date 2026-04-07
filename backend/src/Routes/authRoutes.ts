import express from 'express';
import { register, login } from '../Controllers/authController.js';
import { protect, authorizeRoles } from '../middlewares/authMiddleware.js';

const router = express.Router();

router.post('/register', register);
router.post('/login', login);

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
