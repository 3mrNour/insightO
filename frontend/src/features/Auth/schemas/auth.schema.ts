import { z } from 'zod';
import { USER_ROLES } from '../types';

export const loginSchema = z.object({
  email: z
    .string()
    .min(1, 'Email is required')
    .email('Please enter a valid email address'),
  password: z.string().min(1, 'Password is required'),
});

export type LoginFormData = z.infer<typeof loginSchema>;

const baseRegisterSchema = z.object({
  firstName: z
    .string()
    .min(1, 'First name is required')
    .max(50, 'First name is too long'),
  lastName: z
    .string()
    .min(1, 'Last name is required')
    .max(50, 'Last name is too long'),
  email: z
    .string()
    .min(1, 'Email is required')
    .email('Please enter a valid email address'),
  nationalId: z
    .string()
    .min(1, 'National ID is required')
    .regex(/^\d+$/, 'National ID must contain only digits'),
  role: z.enum(USER_ROLES, {
    message: 'Please select a role',
  }),
  departmentId: z.string().optional(),
  academicYear: z.string().optional(),
  password: z
    .string()
    .min(8, 'Password must be at least 8 characters')
    .regex(/[A-Z]/, 'Password must contain at least one uppercase letter')
    .regex(/[a-z]/, 'Password must contain at least one lowercase letter')
    .regex(/\d/, 'Password must contain at least one number'),
  confirmPassword: z.string().min(1, 'Please confirm your password'),
});

export const registerSchema = baseRegisterSchema
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ['confirmPassword'],
  })
  .refine(
    (data) => {
      if (data.role !== 'ADMIN') return !!data.departmentId?.trim();
      return true;
    },
    { message: 'Department is required for this role', path: ['departmentId'] },
  )
  .refine(
    (data) => {
      if (data.role !== 'STUDENT') return true;
      const year = Number(data.academicYear);
      return !isNaN(year) && year >= 1 && year <= 6;
    },
    {
      message: 'Academic year is required (1–6)',
      path: ['academicYear'],
    },
  );

export type RegisterFormData = z.infer<typeof baseRegisterSchema>;

export const otpSchema = z.object({
  otp: z
    .string()
    .min(6, 'Please enter the full 6-digit code')
    .max(6, 'Code must be 6 digits')
    .regex(/^\d{6}$/, 'Code must contain only digits'),
});

export type OtpFormData = z.infer<typeof otpSchema>;
