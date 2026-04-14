// src/validations/userValidation.ts
import { z } from 'zod';

const nationalIdRegex = /^[0-9]{14}$/;

export const userRegisterSchema = z.object({
  body: z.object({
    firstName: z.string().min(2, "First name must be at least 2 characters"),
    lastName: z.string().min(2, "Last name must be at least 2 characters"),
    email: z.string().email("Invalid email format"),
    password: z.string().min(8, "Password must be at least 8 characters"),
    

    nationalId: z.string().regex(nationalIdRegex, "National ID must be exactly 14 digits"),
    

    role: z.enum(['ADMIN', 'HEAD_OF_DEP', 'INSTRUCTOR', 'STUDENT'], {
      message: "Please select a valid user role"
    }),
    
    departmentId: z.string().regex(/^[0-9a-fA-F]{24}$/, "Invalid ID").optional(),
    academicYear: z.number().optional()
  })
});