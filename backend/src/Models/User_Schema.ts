import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  // 1. المعلومات الأساسية
  fullName: {
    type: String,
    required: [true, 'Please provide your full name'],
    trim: true
  },
  email: {
    type: String,
    required: [true, 'Please provide your email'],
    unique: true,
    lowercase: true,
    trim: true
  },
  password: {
    type: String,
    required: [true, 'Please provide a password'],
    minlength: 8,
    select: false // عشان الباسورد ميرجعش تلقائياً في الـ Queries
  },

  // 2. المحرك الأساسي (System Logic)
  role: {
    type: String,
    enum: ['super-admin', 'sub-admin', 'employee'],
    default: 'employee'
  },

  // 3. التدرج الوظيفي (Hierarchy)
  department: {
    type: String,
    required: [true, 'User must belong to a department']
  },
  manager: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User', // الموظف والـ Sub-admin ليهم مدير
    default: null
  },

  // 4. مقاييس الأداء (Performance Logic)
  performanceScore: {
    type: Number,
    min: 0,
    max: 100,
    default: 0
  },
  lastEvaluationDate: {
    type: Date
  },

  // 5. حالة الحساب
  isActive: {
    type: Boolean,
    default: true
  },

  // لغة الواجهة المفضلة
  preferredLanguage: {
    type: String,
    enum: ['ar', 'en'],
    default: 'en'
  }
}, {
  timestamps: true // بيضيف createdAt و updatedAt تلقائياً
});

// إضافة Index للبحث السريع بالإيميل والقسم
userSchema.index({ email: 1, department: 1 });

const User = mongoose.model('User', userSchema);

export default User;