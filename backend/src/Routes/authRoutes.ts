import express from 'express';
import { register, login, forgotPassword, verifyOTP, resetPassword } from '../Controllers/authController.js';
import { protect, authorizeRoles } from '../middlewares/authMiddleware.js';
import { validate } from '../middlewares/validateMiddleware.js';
import { userRegisterSchema } from '../Validation/userValidation.js';
const router = express.Router();

//Public routes
router.post('/register',validate(userRegisterSchema), register);
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
