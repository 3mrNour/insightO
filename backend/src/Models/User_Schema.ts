import mongoose from 'mongoose';



import {UserSchema} from '../Utils/User.js';

const user_Schema = new mongoose.Schema({
  
  firstName: { type: String, required: true, trim: true },
  lastName: { type: String, required: true, trim: true },
  email: { type: String, required: true, unique: true, lowercase: true },
  password: { type: String, required: true, minlength: 8, select: false },
  phone: { type: Number }, 
  address: { type: String },
  nationalId: { type: Number, unique: true, required: true }, 
  
  role: {
    type: String,
    enum: [UserSchema.ADMIN, UserSchema.HEAD_OF_DEP, UserSchema.INSTRUCTOR, UserSchema.STUDENT],
    required: true
  },



  departmentId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Department', 
    required: function() { return this.role !== UserSchema.ADMIN; } 
  },


  
  academicYear: {
    type: Number,
    required: function() { return this.role === UserSchema.STUDENT; }
  },


  profileImg: { type: String, default: 'default-user.png' },
  isActive: { type: Boolean, default: true },

  otp: {
    type: String,
    select: false
  },
  otpExpires: {
    type: Date,
    select: false
  }

}, 
{ timestamps: true });


const User = mongoose.model('User', user_Schema);

export default User;