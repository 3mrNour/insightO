import type { Request, Response } from 'express';
import User from '../Models/User_Schema.js';
import jwt from 'jsonwebtoken';
import bcryptjs from 'bcryptjs';
import sendEmail from '../Utils/Email.js';

const generateToken = (id: string, role: string) => {
  return jwt.sign({ id, role }, process.env.JWT_SECRET || 'fallback_secret', {
    expiresIn: '7d'
  });
};


// Register Controller

export const register = async (req: Request, res: Response): Promise<void> => {
  try {
    const { firstName, lastName, email, password, role, nationalId, departmentId, academicYear } = req.body;

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      res.status(409).json({ message: 'Email is already registered' });
      return;
    }

    const salt = await bcryptjs.genSalt(10);
    const hashedPassword = await bcryptjs.hash(password, salt);

    const user = await User.create({
      firstName,
      lastName,
      email,
      password: hashedPassword,
      role: role || 'STUDENT',
      nationalId,
      departmentId,
      academicYear,
      isVerified: false
    });

    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    user.otp = otp;
    user.otpExpires = new Date(Date.now() + 10 * 60 * 1000); 
    await user.save({ validateBeforeSave: false });

    try {
      await sendEmail({
        email: user.email,
        subject: 'Your activation code (insightO)',
        message: `Welcome to insightO! Your activation code is: ${otp}.`
      });

      const token = generateToken(user._id.toString(), user.role);

      res.status(201).json({
        message: 'User registered successfully',
        token,
        user: {
          id: user._id,
          firstName: user.firstName,
          lastName: user.lastName,
          email: user.email,
          role: user.role
        }
      });
    } catch (error: any) {
      if (error.name === 'ValidationError') {
        const messages = Object.values(error.errors).map((val: any) => val.message);
        res.status(400).json({ message: messages.join(', ') });
        return;
      }
      res.status(500).json({ message: 'Server error during registration', error: error.message });
    }

  } catch (error: any) {
    res.status(500).json({ message: 'Server error during registration', error: error.message });
  }
};


// login Controller

export const login = async (req: Request, res: Response): Promise<void> => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      res.status(400).json({ message: 'Please provide email and password' });
      return;
    }

    const user = await User.findOne({ email }).select('+password');
    if (!user) {
      res.status(401).json({ message: 'Invalid credentials' });
      return;
    }

    const isMatch = await bcryptjs.compare(password, user.password as string);
    if (!isMatch) {
      res.status(401).json({ message: 'Invalid credentials' });
      return;
    }

    const token = generateToken(user._id.toString(), user.role);

    res.status(200).json({
      message: 'Login successful',
      token,
      user: {
        id: user._id,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        role: user.role
      }
    });
  } catch (error: any) {
    res.status(500).json({ message: 'Server error during login', error: error.message });
  }
};


// forget password Controller

export const forgotPassword = async (req: Request, res: Response) => {

  const { email } = req.body;

  const user = await User.findOne({ email });
  if (!user) {
    return res.status(404).json({ status: 'fail', message: "Your email isn't registered with us" });
  }

  const otp = Math.floor(100000 + Math.random() * 900000).toString();

  user.otp = otp;
  user.otpExpires = new Date(Date.now() + 300 * 1000);
  await user.save({ validateBeforeSave: false });

  try {
    await sendEmail({
      email: user.email,
      subject: 'Your Verification Code (insightO)',
      message: `Your verification code is: ${otp}. `
    });

    res.status(200).json({ status: 'success', message: 'Verification code sent to your email' });
  } catch (err) {
    user.otp = undefined;
    user.otpExpires = undefined;
    await user.save({ validateBeforeSave: false });
    return res.status(500).json({ status: 'error', message: 'There was an error sending the email, please try again' });
  }
};


// verify OTP Controller

export const verifyOTP = async (req: Request, res: Response) => {

  const { email, otp } = req.body;

  const user = await User.findOne({ email }).select('+otp +otpExpires');
  const isOtpExpired = Date.now() > (user?.otpExpires as Date).getTime()
  if (!user || user.otp !== otp || isOtpExpired) {
    return res.status(400).json({ message: 'Invalid or expired OTP' });
  }
  user.otp = undefined;
  user.otpExpires = undefined;
  await user.save({ validateBeforeSave: false });

  res.status(200).json({ status: 'success', message: 'OTP verified successfully, you can now change your password' });
};


//reset password Controller

export const resetPassword = async (req: Request, res: Response) => {
  const { email, password, confirmPassword } = req.body;

  if (password !== confirmPassword) {
    return res.status(400).json({
      status: 'fail',
      message: 'password and confirmPassword must match'
    });
  }

  const user = await User.findOne({ email });

  if (!user) {
    return res.status(404).json({
      status: 'fail',
      message: 'Your email is not registered with us'
    });
  }

  user.password = await bcryptjs.hash(password, 10);
  user.confirmPassword = confirmPassword; 
  
  await user.save();

  res.status(200).json({
    status: 'success',
    message: 'Congratulations! Your password has been changed successfully, you can now log in'
  });
};