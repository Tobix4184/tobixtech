# TobixTech Backend Development - Complete Production-Ready Specification

You are tasked with building a secure, scalable, production-ready Node.js + Express backend for the TobixTech educational platform. This backend will be deployed on Fly.io and use MongoDB Atlas as the database.

## 🎯 **Core Requirements**

### **Technology Stack**
- **Runtime**: Node.js (v18+)
- **Framework**: Express.js with TypeScript
- **Database**: MongoDB Atlas with Mongoose ODM
- **Authentication**: JWT tokens with bcrypt hashing
- **Deployment**: Fly.io with Docker
- **Security**: helmet, cors, express-rate-limit, express-validator
- **Logging**: winston for structured logging
- **Monitoring**: Health checks and error tracking

### **Project Structure**
\`\`\`
backend/
├── src/
│   ├── config/
│   │   ├── database.ts
│   │   ├── environment.ts
│   │   └── logger.ts
│   ├── models/
│   │   ├── User.ts
│   │   ├── Pin.ts
│   │   ├── Course.ts
│   │   ├── BlogPost.ts
│   │   └── AdminCredentials.ts
│   ├── routes/
│   │   ├── admin/
│   │   │   ├── auth.ts
│   │   │   ├── users.ts
│   │   │   ├── pins.ts
│   │   │   ├── courses.ts
│   │   │   └── blogPosts.ts
│   │   ├── pins.ts
│   │   ├── courses.ts
│   │   └── health.ts
│   ├── middleware/
│   │   ├── auth.ts
│   │   ├── validation.ts
│   │   ├── rateLimit.ts
│   │   ├── errorHandler.ts
│   │   └── logger.ts
│   ├── utils/
│   │   ├── pinGenerator.ts
│   │   ├── helpers.ts
│   │   └── constants.ts
│   ├── types/
│   │   └── index.ts
│   └── app.ts
├── Dockerfile
├── fly.toml
├── package.json
├── tsconfig.json
└── .env.example
\`\`\`

## 🗄️ **Database Schema (MongoDB with TypeScript)**

### **Users Collection**
\`\`\`typescript
interface IUser {
  _id: ObjectId;
  email: string; // required, unique, validated
  firstName?: string;
  lastName?: string;
  courses: string[]; // Array of course IDs
  enrollmentDate: Date;
  lastActive: Date;
  status: 'active' | 'inactive' | 'suspended';
  metadata: {
    deviceIds: string[]; // Track multiple devices
    ipAddresses: string[];
    userAgent: string;
  };
  createdAt: Date;
  updatedAt: Date;
}

// Mongoose Schema with validation
const userSchema = new Schema<IUser>({
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    validate: [validator.isEmail, 'Invalid email format']
  },
  firstName: { type: String, trim: true },
  lastName: { type: String, trim: true },
  courses: [{ type: String, ref: 'Course' }],
  enrollmentDate: { type: Date, default: Date.now },
  lastActive: { type: Date, default: Date.now },
  status: {
    type: String,
    enum: ['active', 'inactive', 'suspended'],
    default: 'active'
  },
  metadata: {
    deviceIds: [String],
    ipAddresses: [String],
    userAgent: String
  }
}, {
  timestamps: true,
  toJSON: { virtuals: true },
  toObject: { virtuals: true }
});

// Indexes for performance
userSchema.index({ email: 1 }, { unique: true });
userSchema.index({ status: 1, lastActive: -1 });
userSchema.index({ courses: 1 });
\`\`\`

### **Pins Collection** (Enhanced with Analytics)
\`\`\`typescript
interface IPin {
  _id: ObjectId;
  pin: string; // 5 digits, unique, indexed
  courseId: string; // required, indexed
  usageLimit: number; // 1-100, default: 1
  usedCount: number; // default: 0
  deviceId?: string; // UUID from frontend, permanent binding
  deviceInfo?: {
    userAgent: string;
    platform: string;
    browser: string;
    ipAddress: string;
  };
  expirationDate: Date; // required, indexed
  status: 'active' | 'revoked' | 'expired';
  createdBy: string; // admin identifier
  notes?: string; // admin notes
  analytics: {
    firstUsed?: Date;
    lastUsed?: Date;
    accessAttempts: number;
    failedAttempts: number;
  };
  createdAt: Date;
  updatedAt: Date;
}

const pinSchema = new Schema<IPin>({
  pin: {
    type: String,
    required: true,
    unique: true,
    validate: [/^\d{5}$/, 'PIN must be exactly 5 digits']
  },
  courseId: {
    type: String,
    required: true,
    ref: 'Course'
  },
  usageLimit: {
    type: Number,
    required: true,
    min: 1,
    max: 100,
    default: 1
  },
  usedCount: {
    type: Number,
    default: 0,
    min: 0
  },
  deviceId: {
    type: String,
    sparse: true // Allows multiple null values
  },
  deviceInfo: {
    userAgent: String,
    platform: String,
    browser: String,
    ipAddress: String
  },
  expirationDate: {
    type: Date,
    required: true,
    index: true
  },
  status: {
    type: String,
    enum: ['active', 'revoked', 'expired'],
    default: 'active'
  },
  createdBy: {
    type: String,
    default: 'admin'
  },
  notes: String,
  analytics: {
    firstUsed: Date,
    lastUsed: Date,
    accessAttempts: { type: Number, default: 0 },
    failedAttempts: { type: Number, default: 0 }
  }
}, {
  timestamps: true
});

// Compound indexes for performance
pinSchema.index({ pin: 1 }, { unique: true });
pinSchema.index({ courseId: 1, status: 1 });
pinSchema.index({ deviceId: 1 }, { sparse: true });
pinSchema.index({ expirationDate: 1 });
pinSchema.index({ status: 1, expirationDate: 1 });

// Pre-save middleware to check expiration
pinSchema.pre('save', function(next) {
  if (this.expirationDate < new Date() && this.status === 'active') {
    this.status = 'expired';
  }
  next();
});
\`\`\`

### **Courses Collection** (Enhanced)
\`\`\`typescript
interface ICourse {
  _id: ObjectId;
  id: string; // URL-friendly ID, unique
  title: string;
  description: string;
  longDescription?: string;
  price: string;
  originalPrice?: string;
  thumbnail: string;
  modules: string[];
  prerequisites: string[];
  learningOutcomes: string[];
  duration: string; // e.g., "30 hours"
  level: 'Beginner' | 'Intermediate' | 'Advanced';
  category: string;
  tags: string[];
  instructor: {
    name: string;
    bio: string;
    avatar: string;
  };
  status: 'draft' | 'published' | 'archived';
  analytics: {
    totalPins: number;
    activePins: number;
    totalEnrollments: number;
    completionRate: number;
    averageRating: number;
    totalReviews: number;
  };
  seo: {
    metaTitle: string;
    metaDescription: string;
    keywords: string[];
  };
  createdAt: Date;
  updatedAt: Date;
}

const courseSchema = new Schema<ICourse>({
  id: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    validate: [/^[a-z0-9-]+$/, 'Course ID must be lowercase alphanumeric with hyphens']
  },
  title: {
    type: String,
    required: true,
    trim: true,
    maxlength: 200
  },
  description: {
    type: String,
    required: true,
    trim: true,
    maxlength: 500
  },
  longDescription: {
    type: String,
    trim: true,
    maxlength: 2000
  },
  price: {
    type: String,
    required: true
  },
  originalPrice: String,
  thumbnail: {
    type: String,
    required: true
  },
  modules: [String],
  prerequisites: [String],
  learningOutcomes: [String],
  duration: String,
  level: {
    type: String,
    enum: ['Beginner', 'Intermediate', 'Advanced'],
    required: true
  },
  category: {
    type: String,
    required: true
  },
  tags: [String],
  instructor: {
    name: { type: String, required: true },
    bio: String,
    avatar: String
  },
  status: {
    type: String,
    enum: ['draft', 'published', 'archived'],
    default: 'draft'
  },
  analytics: {
    totalPins: { type: Number, default: 0 },
    activePins: { type: Number, default: 0 },
    totalEnrollments: { type: Number, default: 0 },
    completionRate: { type: Number, default: 0 },
    averageRating: { type: Number, default: 0 },
    totalReviews: { type: Number, default: 0 }
  },
  seo: {
    metaTitle: String,
    metaDescription: String,
    keywords: [String]
  }
}, {
  timestamps: true
});

// Indexes
courseSchema.index({ id: 1 }, { unique: true });
courseSchema.index({ status: 1, category: 1 });
courseSchema.index({ level: 1, status: 1 });
courseSchema.index({ 'analytics.averageRating': -1 });
\`\`\`

### **BlogPosts Collection** (Enhanced)
\`\`\`typescript
interface IBlogPost {
  _id: ObjectId;
  title: string;
  slug: string; // unique, URL-friendly
  content: string;
  excerpt: string;
  thumbnail: string;
  tags: string[];
  category: string;
  author: {
    name: string;
    avatar: string;
    bio: string;
  };
  status: 'draft' | 'published' | 'archived';
  featured: boolean;
  seo: {
    metaTitle: string;
    metaDescription: string;
    keywords: string[];
  };
  analytics: {
    views: number;
    likes: number;
    shares: number;
    readTime: number; // in minutes
  };
  publishedAt?: Date;
  createdAt: Date;
  updatedAt: Date;
}

const blogPostSchema = new Schema<IBlogPost>({
  title: {
    type: String,
    required: true,
    trim: true,
    maxlength: 200
  },
  slug: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    validate: [/^[a-z0-9-]+$/, 'Slug must be lowercase alphanumeric with hyphens']
  },
  content: {
    type: String,
    required: true
  },
  excerpt: {
    type: String,
    required: true,
    maxlength: 300
  },
  thumbnail: String,
  tags: [String],
  category: {
    type: String,
    required: true
  },
  author: {
    name: { type: String, default: 'TobixTech' },
    avatar: String,
    bio: String
  },
  status: {
    type: String,
    enum: ['draft', 'published', 'archived'],
    default: 'draft'
  },
  featured: {
    type: Boolean,
    default: false
  },
  seo: {
    metaTitle: String,
    metaDescription: String,
    keywords: [String]
  },
  analytics: {
    views: { type: Number, default: 0 },
    likes: { type: Number, default: 0 },
    shares: { type: Number, default: 0 },
    readTime: { type: Number, default: 5 }
  },
  publishedAt: Date
}, {
  timestamps: true
});

// Indexes
blogPostSchema.index({ slug: 1 }, { unique: true });
blogPostSchema.index({ status: 1, publishedAt: -1 });
blogPostSchema.index({ category: 1, status: 1 });
blogPostSchema.index({ featured: 1, status: 1 });
blogPostSchema.index({ tags: 1 });
\`\`\`

### **AdminCredentials Collection** (Enhanced Security)
\`\`\`typescript
interface IAdminCredentials {
  _id: ObjectId;
  pin1: string; // bcrypt hashed
  pin2: string; // bcrypt hashed
  isActive: boolean;
  lastUsed?: Date;
  loginAttempts: {
    count: number;
    lastAttempt: Date;
    lockedUntil?: Date;
  };
  sessions: {
    deviceId: string;
    ipAddress: string;
    userAgent: string;
    loginTime: Date;
    lastActivity: Date;
    isActive: boolean;
  }[];
  securitySettings: {
    maxLoginAttempts: number;
    lockoutDuration: number; // in minutes
    sessionTimeout: number; // in hours
  };
  createdAt: Date;
  updatedAt: Date;
}

const adminCredentialsSchema = new Schema<IAdminCredentials>({
  pin1: {
    type: String,
    required: true,
    validate: [/^\$2[aby]\$\d{1,2}\$.{53}$/, 'PIN1 must be a valid bcrypt hash']
  },
  pin2: {
    type: String,
    required: true,
    validate: [/^\$2[aby]\$\d{1,2}\$.{53}$/, 'PIN2 must be a valid bcrypt hash']
  },
  isActive: {
    type: Boolean,
    default: true
  },
  lastUsed: Date,
  loginAttempts: {
    count: { type: Number, default: 0 },
    lastAttempt: Date,
    lockedUntil: Date
  },
  sessions: [{
    deviceId: String,
    ipAddress: String,
    userAgent: String,
    loginTime: Date,
    lastActivity: Date,
    isActive: { type: Boolean, default: true }
  }],
  securitySettings: {
    maxLoginAttempts: { type: Number, default: 5 },
    lockoutDuration: { type: Number, default: 15 }, // 15 minutes
    sessionTimeout: { type: Number, default: 4 } // 4 hours
  }
}, {
  timestamps: true
});
\`\`\`

## 🔐 **Enhanced Security Implementation**

### **1. Advanced Device-Bound PIN System**

\`\`\`typescript
// Enhanced PIN validation with comprehensive security
export const validatePin = async (req: Request, res: Response) => {
  try {
    const { courseId, pin, deviceId } = req.body;
    const clientIP = req.ip || req.connection.remoteAddress;
    const userAgent = req.get('User-Agent') || '';

    // Input validation
    const validationResult = validatePinInput({ courseId, pin, deviceId });
    if (!validationResult.isValid) {
      return res.status(400).json({
        valid: false,
        message: validationResult.message
      });
    }

    // Find PIN with course validation
    const pinRecord = await Pin.findOne({ pin, courseId }).populate('courseId');
    if (!pinRecord) {
      // Log failed attempt
      await logSecurityEvent('PIN_NOT_FOUND', { pin, courseId, clientIP, userAgent });
      return res.status(400).json({
        valid: false,
        message: 'Invalid PIN for this course'
      });
    }

    // Comprehensive PIN validation
    const validationChecks = await performPinValidation(pinRecord, deviceId, clientIP, userAgent);
    if (!validationChecks.isValid) {
      // Update analytics for failed attempt
      await Pin.findByIdAndUpdate(pinRecord._id, {
        $inc: { 'analytics.failedAttempts': 1 }
      });
      
      return res.status(400).json({
        valid: false,
        message: validationChecks.message
      });
    }

    // Device binding logic with enhanced tracking
    if (!pinRecord.deviceId) {
      // First use - bind to device with comprehensive info
      const deviceInfo = parseUserAgent(userAgent);
      await Pin.findByIdAndUpdate(pinRecord._id, {
        deviceId: deviceId,
        deviceInfo: {
          userAgent,
          platform: deviceInfo.platform,
          browser: deviceInfo.browser,
          ipAddress: clientIP
        },
        $inc: { 
          usedCount: 1,
          'analytics.accessAttempts': 1
        },
        $set: {
          'analytics.firstUsed': new Date(),
          'analytics.lastUsed': new Date()
        }
      });

      // Log successful binding
      await logSecurityEvent('PIN_DEVICE_BOUND', {
        pin: pinRecord.pin,
        courseId,
        deviceId,
        clientIP,
        userAgent
      });

    } else if (pinRecord.deviceId === deviceId) {
      // Existing device - update last used
      await Pin.findByIdAndUpdate(pinRecord._id, {
        $inc: { 'analytics.accessAttempts': 1 },
        $set: { 'analytics.lastUsed': new Date() }
      });
    } else {
      // Different device - security violation
      await logSecurityEvent('PIN_DEVICE_MISMATCH', {
        pin: pinRecord.pin,
        courseId,
        originalDevice: pinRecord.deviceId,
        attemptedDevice: deviceId,
        clientIP,
        userAgent
      });

      return res.status(403).json({
        valid: false,
        message: 'PIN is permanently linked to another device'
      });
    }

    // Success response with enhanced data
    res.json({
      valid: true,
      message: 'Access granted',
      courseId,
      deviceLinked: true,
      accessInfo: {
        usageCount: `${pinRecord.usedCount + 1}/${pinRecord.usageLimit}`,
        expiresAt: pinRecord.expirationDate,
        firstAccess: pinRecord.analytics.firstUsed || new Date()
      }
    });

  } catch (error) {
    logger.error('PIN validation error:', error);
    res.status(500).json({
      valid: false,
      message: 'Internal server error'
    });
  }
};

// Comprehensive PIN validation function
async function performPinValidation(pinRecord: IPin, deviceId: string, clientIP: string, userAgent: string) {
  // Status check
  if (pinRecord.status !== 'active') {
    return { isValid: false, message: `PIN has been ${pinRecord.status}` };
  }

  // Expiration check with auto-update
  if (new Date(pinRecord.expirationDate) < new Date()) {
    await Pin.findByIdAndUpdate(pinRecord._id, { status: 'expired' });
    return { isValid: false, message: 'PIN has expired' };
  }

  // Usage limit check
  if (pinRecord.usedCount >= pinRecord.usageLimit) {
    return { isValid: false, message: 'PIN usage limit exceeded' };
  }

  // Device binding check
  if (pinRecord.deviceId && pinRecord.deviceId !== deviceId) {
    return { isValid: false, message: 'PIN is linked to another device' };
  }

  // Rate limiting check (prevent brute force)
  const recentAttempts = await Pin.countDocuments({
    'analytics.lastUsed': { $gte: new Date(Date.now() - 5 * 60 * 1000) }, // 5 minutes
    'deviceInfo.ipAddress': clientIP
  });

  if (recentAttempts > 10) {
    return { isValid: false, message: 'Too many attempts from this IP address' };
  }

  return { isValid: true, message: 'Validation passed' };
}
\`\`\`

### **2. Enhanced Admin Authentication**

\`\`\`typescript
// Two-step admin authentication with advanced security
export const adminAuth = async (req: Request, res: Response) => {
  try {
    const { step, pin, pin1, pin2 } = req.body;
    const clientIP = req.ip || req.connection.remoteAddress;
    const userAgent = req.get('User-Agent') || '';
    const deviceId = req.get('X-Device-ID') || generateDeviceId();

    // Get admin credentials
    const adminCreds = await AdminCredentials.findOne({ isActive: true });
    if (!adminCreds) {
      logger.error('Admin credentials not configured');
      return res.status(500).json({
        success: false,
        message: 'Authentication service unavailable'
      });
    }

    // Check if account is locked
    if (adminCreds.loginAttempts.lockedUntil && adminCreds.loginAttempts.lockedUntil > new Date()) {
      const lockTimeRemaining = Math.ceil((adminCreds.loginAttempts.lockedUntil.getTime() - Date.now()) / 60000);
      return res.status(423).json({
        success: false,
        message: `Account locked. Try again in ${lockTimeRemaining} minutes.`
      });
    }

    if (step === 1) {
      // Step 1: Validate first PIN
      if (!pin || pin.length !== 6 || !/^\d{6}$/.test(pin)) {
        await incrementLoginAttempts(adminCreds._id);
        return res.status(400).json({
          success: false,
          message: 'First PIN must be exactly 6 digits'
        });
      }

      const isPin1Valid = await bcrypt.compare(pin, adminCreds.pin1);
      if (!isPin1Valid) {
        await incrementLoginAttempts(adminCreds._id);
        await logSecurityEvent('ADMIN_AUTH_STEP1_FAILED', { clientIP, userAgent, deviceId });
        
        return res.status(401).json({
          success: false,
          message: 'Invalid first PIN'
        });
      }

      // Step 1 success
      await logSecurityEvent('ADMIN_AUTH_STEP1_SUCCESS', { clientIP, userAgent, deviceId });
      res.json({
        success: true,
        message: 'Step 1 complete. Enter second PIN.'
      });

    } else if (step === 2) {
      // Step 2: Validate both PINs and create session
      if (!pin1 || !pin2 || pin1.length !== 6 || pin2.length !== 6) {
        await incrementLoginAttempts(adminCreds._id);
        return res.status(400).json({
          success: false,
          message: 'Both PINs must be exactly 6 digits'
        });
      }

      const isPin1Valid = await bcrypt.compare(pin1, adminCreds.pin1);
      const isPin2Valid = await bcrypt.compare(pin2, adminCreds.pin2);

      if (!isPin1Valid || !isPin2Valid) {
        await incrementLoginAttempts(adminCreds._id);
        await logSecurityEvent('ADMIN_AUTH_STEP2_FAILED', { clientIP, userAgent, deviceId });
        
        return res.status(401).json({
          success: false,
          message: 'Invalid PIN combination'
        });
      }

      // Authentication successful - create session
      const sessionToken = jwt.sign(
        { 
          role: 'admin',
          deviceId,
          sessionId: generateSessionId(),
          iat: Math.floor(Date.now() / 1000)
        },
        process.env.JWT_SECRET!,
        { expiresIn: `${adminCreds.securitySettings.sessionTimeout}h` }
      );

      // Update admin credentials
      await AdminCredentials.findByIdAndUpdate(adminCreds._id, {
        lastUsed: new Date(),
        'loginAttempts.count': 0,
        'loginAttempts.lockedUntil': undefined,
        $push: {
          sessions: {
            deviceId,
            ipAddress: clientIP,
            userAgent,
            loginTime: new Date(),
            lastActivity: new Date(),
            isActive: true
          }
        }
      });

      // Log successful authentication
      await logSecurityEvent('ADMIN_AUTH_SUCCESS', { clientIP, userAgent, deviceId });

      res.json({
        success: true,
        message: 'Admin access granted',
        token: sessionToken,
        expiresIn: adminCreds.securitySettings.sessionTimeout * 3600 // in seconds
      });

    } else {
      return res.status(400).json({
        success: false,
        message: 'Invalid authentication step'
      });
    }

  } catch (error) {
    logger.error('Admin authentication error:', error);
    res.status(500).json({
      success: false,
      message: 'Authentication service error'
    });
  }
};

// Helper function to increment login attempts with lockout
async function incrementLoginAttempts(adminId: ObjectId) {
  const admin = await AdminCredentials.findById(adminId);
  if (!admin) return;

  const attempts = admin.loginAttempts.count + 1;
  const updateData: any = {
    'loginAttempts.count': attempts,
    'loginAttempts.lastAttempt': new Date()
  };

  // Lock account if max attempts reached
  if (attempts >= admin.securitySettings.maxLoginAttempts) {
    updateData['loginAttempts.lockedUntil'] = new Date(
      Date.now() + admin.securitySettings.lockoutDuration * 60 * 1000
    );
  }

  await AdminCredentials.findByIdAndUpdate(adminId, updateData);
}
\`\`\`

## 📡 **Complete API Endpoints with Enhanced Features**

### **Health Check & Monitoring**
\`\`\`typescript
// GET /api/health
export const healthCheck = async (req: Request, res: Response) => {
  try {
    // Database connectivity check
    const dbStatus = await mongoose.connection.db.admin().ping();
    
    // System metrics
    const systemInfo = {
      uptime: process.uptime(),
      memory: process.memoryUsage(),
      version: process.version,
      environment: process.env.NODE_ENV
    };

    // Database metrics
    const dbMetrics = {
      totalUsers: await User.countDocuments(),
      totalPins: await Pin.countDocuments(),
      activePins: await Pin.countDocuments({ status: 'active' }),
      totalCourses: await Course.countDocuments({ status: 'published' })
    };

    res.json({
      status: 'healthy',
      timestamp: new Date().toISOString(),
      system: systemInfo,
      database: {
        status: dbStatus.ok === 1 ? 'connected' : 'disconnected',
        metrics: dbMetrics
      }
    });

  } catch (error) {
    logger.error('Health check failed:', error);
    res.status(503).json({
      status: 'unhealthy',
      timestamp: new Date().toISOString(),
      error: error.message
    });
  }
};
\`\`\`

### **Enhanced PIN Management**
\`\`\`typescript
// GET /api/admin/pins - List all PINs with advanced filtering
export const getAllPins = async (req: Request, res: Response) => {
  try {
    const {
      page = 1,
      limit = 20,
      courseId,
      status,
      deviceBound,
      expired,
      search,
      sortBy = 'createdAt',
      sortOrder = 'desc'
    } = req.query;

    // Build query
    const query: any = {};
    
    if (courseId) query.courseId = courseId;
    if (status) query.status = status;
    if (deviceBound === 'true') query.deviceId = { $exists: true, $ne: null };
    if (deviceBound === 'false') query.deviceId = { $exists: false };
    if (expired === 'true') query.expirationDate = { $lt: new Date() };
    if (expired === 'false') query.expirationDate = { $gte: new Date() };
    if (search) {
      query.$or = [
        { pin: { $regex: search, $options: 'i' } },
        { notes: { $regex: search, $options: 'i' } }
      ];
    }

    // Execute query with pagination
    const pins = await Pin.find(query)
      .populate('courseId', 'title id')
      .sort({ [sortBy as string]: sortOrder === 'desc' ? -1 : 1 })
      .limit(Number(limit))
      .skip((Number(page) - 1) * Number(limit))
      .lean();

    const total = await Pin.countDocuments(query);

    // Calculate analytics
    const analytics = await Pin.aggregate([
      { $match: query },
      {
        $group: {
          _id: null,
          totalPins: { $sum: 1 },
          activePins: { $sum: { $cond: [{ $eq: ['$status', 'active'] }, 1, 0] } },
          boundPins: { $sum: { $cond: [{ $ne: ['$deviceId', null] }, 1, 0] } },
          totalUsage: { $sum: '$usedCount' },
          totalAttempts: { $sum: '$analytics.accessAttempts' }
        }
      }
    ]);

    res.json({
      success: true,
      pins,
      pagination: {
        page: Number(page),
        limit: Number(limit),
        total,
        pages: Math.ceil(total / Number(limit))
      },
      analytics: analytics[0] || {
        totalPins: 0,
        activePins: 0,
        boundPins: 0,
        totalUsage: 0,
        totalAttempts: 0
      }
    });

  } catch (error) {
    logger.error('Error fetching pins:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch pins'
    });
  }
};

// POST /api/admin/pins/bulk - Create multiple PINs
export const createBulkPins = async (req: Request, res: Response) => {
  try {
    const { courseId, count, usageLimit, expirationDate, notes } = req.body;

    // Validation
    if (!courseId || !count || count < 1 || count > 100) {
      return res.status(400).json({
        success: false,
        message: 'Invalid parameters. Count must be between 1 and 100.'
      });
    }

    // Verify course exists
    const course = await Course.findOne({ id: courseId });
    if (!course) {
      return res.status(404).json({
        success: false,
        message: 'Course not found'
      });
    }

    // Generate unique PINs
    const pins = [];
    const generatedPins = new Set();
    let attempts = 0;
    const maxAttempts = count * 10;

    while (pins.length < count && attempts < maxAttempts) {
      const pin = generateUniquePin();
      if (!generatedPins.has(pin)) {
        const existingPin = await Pin.findOne({ pin });
        if (!existingPin) {
          generatedPins.add(pin);
          pins.push({
            pin,
            courseId,
            usageLimit: usageLimit || 1,
            expirationDate: new Date(expirationDate),
            status: 'active',
            notes: notes || `Bulk created - ${new Date().toISOString()}`,
            createdBy: 'admin',
            analytics: {
              accessAttempts: 0,
              failedAttempts: 0
            }
          });
        }
      }
      attempts++;
    }

    if (pins.length < count) {
      return res.status(500).json({
        success: false,
        message: `Could only generate ${pins.length} unique PINs out of ${count} requested`
      });
    }

    // Insert PINs
    const createdPins = await Pin.insertMany(pins);

    // Update course analytics
    await Course.findOneAndUpdate(
      { id: courseId },
      { 
        $inc: { 
          'analytics.totalPins': createdPins.length,
          'analytics.activePins': createdPins.length
        }
      }
    );

    res.json({
      success: true,
      message: `Successfully created ${createdPins.length} PINs`,
      pins: createdPins.map(pin => ({
        pin: pin.pin,
        courseId: pin.courseId,
        expirationDate: pin.expirationDate,
        usageLimit: pin.usageLimit
      }))
    });

  } catch (error) {
    logger.error('Bulk PIN creation error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to create bulk PINs'
    });
  }
};
\`\`\`

## 🚀 **Environment Variables & Configuration**

\`\`\`env
# Database Configuration
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/tobixtech?retryWrites=true&w=majority

# JWT Configuration
JWT_SECRET=your-super-secure-jwt-secret-key-minimum-64-characters-long

# Admin Credentials (bcrypt hashed)
ADMIN_PIN1_HASH=$2b$12$example.hash.for.first.admin.pin
ADMIN_PIN2_HASH=$2b$12$example.hash.for.second.admin.pin

# Server Configuration
PORT=5000
NODE_ENV=production
API_VERSION=v1

# CORS Configuration
FRONTEND_URL=https://tobixtech.vercel.app
ALLOWED_ORIGINS=https://tobixtech.vercel.app,https://www.tobixtech.com

# Rate Limiting
RATE_LIMIT_WINDOW_MS=900000
RATE_LIMIT_MAX_REQUESTS=100
PIN_VALIDATION_RATE_LIMIT=10
ADMIN_AUTH_RATE_LIMIT=5

# Security Settings
BCRYPT_ROUNDS=12
SESSION_TIMEOUT_HOURS=4
MAX_LOGIN_ATTEMPTS=5
LOCKOUT_DURATION_MINUTES=15

# Logging
LOG_LEVEL=info
LOG_FILE_PATH=./logs/app.log

# Monitoring
HEALTH_CHECK_INTERVAL=30000
METRICS_ENABLED=true

# Email Configuration (optional)
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your-email@gmail.com
SMTP_PASS=your-app-password
\`\`\`

## 📦 **Enhanced Package.json**

\`\`\`json
{
  "name": "tobixtech-backend",
  "version": "1.0.0",
  "description": "TobixTech Educational Platform Backend API",
  "main": "dist/app.js",
  "scripts": {
    "start": "node dist/app.js",
    "dev": "nodemon src/app.ts",
    "build": "tsc",
    "test": "jest",
    "test:watch": "jest --watch",
    "lint": "eslint src/**/*.ts",
    "lint:fix": "eslint src/**/*.ts --fix",
    "seed:admin": "ts-node src/scripts/seedAdmin.ts",
    "seed:courses": "ts-node src/scripts/seedCourses.ts",
    "migrate": "ts-node src/scripts/migrate.ts",
    "health": "curl http://localhost:5000/api/health"
  },
  "dependencies": {
    "express": "^4.18.2",
    "mongoose": "^8.0.3",
    "bcryptjs": "^2.4.3",
    "jsonwebtoken": "^9.0.2",
    "cors": "^2.8.5",
    "helmet": "^7.1.0",
    "express-rate-limit": "^7.1.5",
    "express-validator": "^7.0.1",
    "dotenv": "^16.3.1",
    "compression": "^1.7.4",
    "morgan": "^1.10.0",
    "winston": "^3.11.0",
    "winston-daily-rotate-file": "^4.7.1",
    "ua-parser-js": "^1.0.37",
    "validator": "^13.11.0",
    "express-mongo-sanitize": "^2.2.0",
    "express-slow-down": "^2.  "^1.0.37",
    "validator": "^13.11.0",
    "express-mongo-sanitize": "^2.2.0",
    "express-slow-down": "^2.0.0",
    "multer": "^1.4.5-lts.1",
    "sharp": "^0.33.0",
    "nodemailer": "^6.9.7",
    "ioredis": "^5.3.2"
  },
  "devDependencies": {
    "@types/express": "^4.17.21",
    "@types/node": "^20.10.5",
    "@types/bcryptjs": "^2.4.6",
    "@types/jsonwebtoken": "^9.0.5",
    "@types/cors": "^2.8.17",
    "@types/compression": "^1.7.5",
    "@types/morgan": "^1.9.9",
    "@types/validator": "^13.11.7",
    "@types/ua-parser-js": "^0.7.39",
    "@types/multer": "^1.4.11",
    "@types/nodemailer": "^6.4.14",
    "@types/jest": "^29.5.8",
    "typescript": "^5.3.3",
    "ts-node": "^10.9.2",
    "nodemon": "^3.0.2",
    "jest": "^29.7.0",
    "ts-jest": "^29.1.1",
    "@typescript-eslint/eslint-plugin": "^6.13.2",
    "@typescript-eslint/parser": "^6.13.2",
    "eslint": "^8.55.0",
    "prettier": "^3.1.1"
  },
  "engines": {
    "node": ">=18.0.0",
    "npm": ">=8.0.0"
  }
}
\`\`\`

## 🐳 **Docker Configuration**

\`\`\`dockerfile
# Dockerfile
FROM node:18-alpine AS builder

WORKDIR /app

# Copy package files
COPY package*.json ./
COPY tsconfig.json ./

# Install dependencies
RUN npm ci --only=production

# Copy source code
COPY src ./src

# Build TypeScript
RUN npm run build

# Production stage
FROM node:18-alpine AS production

WORKDIR /app

# Install dumb-init for proper signal handling
RUN apk add --no-cache dumb-init

# Create non-root user
RUN addgroup -g 1001 -S nodejs
RUN adduser -S tobixtech -u 1001

# Copy built application
COPY --from=builder --chown=tobixtech:nodejs /app/dist ./dist
COPY --from=builder --chown=tobixtech:nodejs /app/node_modules ./node_modules
COPY --from=builder --chown=tobixtech:nodejs /app/package*.json ./

# Create logs directory
RUN mkdir -p logs && chown tobixtech:nodejs logs

USER tobixtech

EXPOSE 5000

# Health check
HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
  CMD node -e "require('http').get('http://localhost:5000/api/health', (res) => { process.exit(res.statusCode === 200 ? 0 : 1) })"

# Use dumb-init to handle signals properly
ENTRYPOINT ["dumb-init", "--"]
CMD ["node", "dist/app.js"]
\`\`\`

## 🚁 **Enhanced Fly.io Configuration**

\`\`\`toml
# fly.toml
app = "tobixtech-backend"
primary_region = "dfw"

[build]
  dockerfile = "Dockerfile"

[env]
  NODE_ENV = "production"
  PORT = "5000"
  API_VERSION = "v1"
  LOG_LEVEL = "info"
  METRICS_ENABLED = "true"

[http_service]
  internal_port = 5000
  force_https = true
  auto_stop_machines = true
  auto_start_machines = true
  min_machines_running = 1
  processes = ["app"]

  [http_service.checks]
    [http_service.checks.health]
      grace_period = "10s"
      interval = "30s"
      method = "GET"
      timeout = "5s"
      path = "/api/health"

[[vm]]
  cpu_kind = "shared"
  cpus = 1
  memory_mb = 1024

[metrics]
  port = 9091
  path = "/metrics"

[[services]]
  protocol = "tcp"
  internal_port = 5000

  [[services.ports]]
    port = 80
    handlers = ["http"]
    force_https = true

  [[services.ports]]
    port = 443
    handlers = ["tls", "http"]

  [services.concurrency]
    type = "connections"
    hard_limit = 1000
    soft_limit = 800

  [[services.tcp_checks]]
    grace_period = "10s"
    interval = "30s"
    restart_limit = 0
    timeout = "5s"

  [[services.http_checks]]
    grace_period = "10s"
    interval = "30s"
    method = "GET"
    path = "/api/health"
    protocol = "https"
    restart_limit = 0
    timeout = "5s"
    tls_skip_verify = false
\`\`\`

## 🔧 **Admin Seeding Script**

\`\`\`typescript
// src/scripts/seedAdmin.ts
import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import dotenv from 'dotenv';
import { AdminCredentials } from '../models/AdminCredentials';
import { logger } from '../config/logger';

dotenv.config();

async function seedAdminCredentials() {
  try {
    await mongoose.connect(process.env.MONGODB_URI!);
    logger.info('Connected to MongoDB for seeding');

    // Admin PINs - CHANGE THESE IN PRODUCTION!
    const PIN1 = process.env.SEED_ADMIN_PIN1 || '123456';
    const PIN2 = process.env.SEED_ADMIN_PIN2 || '654321';

    if (PIN1 === '123456' || PIN2 === '654321') {
      logger.warn('⚠️  WARNING: Using default admin PINs! Change these in production!');
    }

    // Hash PINs
    const pin1Hash = await bcrypt.hash(PIN1, 12);
    const pin2Hash = await bcrypt.hash(PIN2, 12);

    // Remove existing credentials
    await AdminCredentials.deleteMany({});
    logger.info('Removed existing admin credentials');

    // Create new credentials
    const adminCreds = new AdminCredentials({
      pin1: pin1Hash,
      pin2: pin2Hash,
      isActive: true,
      loginAttempts: {
        count: 0,
        lastAttempt: new Date()
      },
      sessions: [],
      securitySettings: {
        maxLoginAttempts: 5,
        lockoutDuration: 15, // 15 minutes
        sessionTimeout: 4 // 4 hours
      }
    });

    await adminCreds.save();

    logger.info('✅ Admin credentials seeded successfully');
    logger.info(`📌 Admin PIN1: ${PIN1}`);
    logger.info(`📌 Admin PIN2: ${PIN2}`);
    logger.warn('🔒 IMPORTANT: Change these PINs and delete this script in production!');

    // Generate environment variables for production
    console.log('\n📋 Environment Variables for Production:');
    console.log(`ADMIN_PIN1_HASH=${pin1Hash}`);
    console.log(`ADMIN_PIN2_HASH=${pin2Hash}`);

    process.exit(0);
  } catch (error) {
    logger.error('❌ Error seeding admin credentials:', error);
    process.exit(1);
  }
}

// Run if called directly
if (require.main === module) {
  seedAdminCredentials();
}

export { seedAdminCredentials };
\`\`\`

## 🧪 **Testing Configuration**

\`\`\`typescript
// src/__tests__/pin.test.ts
import request from 'supertest';
import { app } from '../app';
import { Pin } from '../models/Pin';
import { Course } from '../models/Course';

describe('PIN Validation', () => {
  beforeEach(async () => {
    await Pin.deleteMany({});
    await Course.deleteMany({});
    
    // Create test course
    await Course.create({
      id: 'test-course',
      title: 'Test Course',
      description: 'Test Description',
      price: '$99',
      status: 'published'
    });

    // Create test PIN
    await Pin.create({
      pin: '12345',
      courseId: 'test-course',
      usageLimit: 1,
      expirationDate: new Date(Date.now() + 24 * 60 * 60 * 1000), // 24 hours
      status: 'active'
    });
  });

  test('should validate PIN successfully on first use', async () => {
    const response = await request(app)
      .post('/api/pins/validate')
      .send({
        courseId: 'test-course',
        pin: '12345',
        deviceId: 'test-device-123'
      });

    expect(response.status).toBe(200);
    expect(response.body.valid).toBe(true);
    expect(response.body.deviceLinked).toBe(true);
  });

  test('should reject PIN for different device', async () => {
    // First use
    await request(app)
      .post('/api/pins/validate')
      .send({
        courseId: 'test-course',
        pin: '12345',
        deviceId: 'device-1'
      });

    // Second use with different device
    const response = await request(app)
      .post('/api/pins/validate')
      .send({
        courseId: 'test-course',
        pin: '12345',
        deviceId: 'device-2'
      });

    expect(response.status).toBe(403);
    expect(response.body.valid).toBe(false);
    expect(response.body.message).toContain('linked to another device');
  });

  test('should reject expired PIN', async () => {
    // Create expired PIN
    await Pin.create({
      pin: '99999',
      courseId: 'test-course',
      usageLimit: 1,
      expirationDate: new Date(Date.now() - 1000), // 1 second ago
      status: 'active'
    });

    const response = await request(app)
      .post('/api/pins/validate')
      .send({
        courseId: 'test-course',
        pin: '99999',
        deviceId: 'test-device'
      });

    expect(response.status).toBe(400);
    expect(response.body.valid).toBe(false);
    expect(response.body.message).toContain('expired');
  });
});
\`\`\`

## 📊 **Deployment Instructions**

### **Step 1: Generate Secrets**
\`\`\`bash
# Generate JWT Secret
node -e "console.log('JWT_SECRET=' + require('crypto').randomBytes(64).toString('hex'))"

# Generate Admin PIN Hashes
node -e "const bcrypt=require('bcryptjs'); console.log('ADMIN_PIN1_HASH=' + bcrypt.hashSync('YOUR_PIN1', 12))"
node -e "const bcrypt=require('bcryptjs'); console.log('ADMIN_PIN2_HASH=' + bcrypt.hashSync('YOUR_PIN2', 12))"
\`\`\`

### **Step 2: Deploy to Fly.io**
\`\`\`bash
# Install Fly CLI
curl -L https://fly.io/install.sh | sh

# Login to Fly.io
fly auth login

# Create app
fly apps create tobixtech-backend

# Set secrets
fly secrets set MONGODB_URI="your-mongodb-connection-string"
fly secrets set JWT_SECRET="your-generated-jwt-secret"
fly secrets set ADMIN_PIN1_HASH="your-hashed-pin1"
fly secrets set ADMIN_PIN2_HASH="your-hashed-pin2"
fly secrets set FRONTEND_URL="https://tobixtech.vercel.app"

# Deploy
fly deploy

# Check status
fly status
fly logs
\`\`\`

### **Step 3: Verify Deployment**
\`\`\`bash
# Health check
curl https://your-app-name.fly.dev/api/health

# Test PIN validation
curl -X POST https://your-app-name.fly.dev/api/pins/validate \
  -H "Content-Type: application/json" \
  -d '{"courseId":"test","pin":"12345","deviceId":"test-device"}'
\`\`\`

## ✅ **Final Deployment Checklist**

- [ ] MongoDB Atlas cluster created and configured
- [ ] Environment variables generated and set
- [ ] Admin PINs hashed and configured
- [ ] Fly.io app created and deployed
- [ ] Health checks passing
- [ ] CORS configured for frontend domain
- [ ] Rate limiting configured
- [ ] Logging and monitoring enabled
- [ ] SSL/TLS certificates configured
- [ ] Database indexes created
- [ ] Admin credentials seeded
- [ ] API endpoints tested
- [ ] Security headers configured
- [ ] Error handling implemented
- [ ] Performance optimizations applied

This backend is now **production-ready** with enterprise-level security, comprehensive error handling, detailed logging, and full compatibility with your frontend. The system supports unlimited PINs per course, advanced device binding, detailed analytics, and robust admin authentication.

```plaintext file=".gitignore"
# Dependencies
node_modules/
npm-debug.log*
yarn-debug.log*
yarn-error.log*
pnpm-debug.log*
lerna-debug.log*

# Runtime data
pids
*.pid
*.seed
*.pid.lock

# Coverage directory used by tools like istanbul
coverage/
*.lcov

# nyc test coverage
.nyc_output

# Grunt intermediate storage (https://gruntjs.com/creating-plugins#storing-task-files)
.grunt

# Bower dependency directory (https://bower.io/)
bower_components

# node-waf configuration
.lock-wscript

# Compiled binary addons (https://nodejs.org/api/addons.html)
build/Release

# Dependency directories
node_modules/
jspm_packages/

# Snowpack dependency directory (https://snowpack.dev/)
web_modules/

# TypeScript cache
*.tsbuildinfo

# Optional npm cache directory
.npm

# Optional eslint cache
.eslintcache

# Optional stylelint cache
.stylelintcache

# Microbundle cache
.rpt2_cache/
.rts2_cache_cjs/
.rts2_cache_es/
.rts2_cache_umd/

# Optional REPL history
.node_repl_history

# Output of 'npm pack'
*.tgz

# Yarn Integrity file
.yarn-integrity

# dotenv environment variable files
.env
.env.development.local
.env.test.local
.env.production.local
.env.local

# parcel-bundler cache (https://parceljs.org/)
.cache
.parcel-cache

# Next.js build output
.next
out/

# Nuxt.js build / generate output
.nuxt
dist

# Gatsby files
.cache/
# Comment in the public line in if your project uses Gatsby and not Next.js
# https://nextjs.org/blog/next-9-1#public-directory-support
# public

# vuepress build output
.vuepress/dist

# vuepress v2.x temp and cache directory
.temp
.cache

# Docusaurus cache and generated files
.docusaurus

# Serverless directories
.serverless/

# FuseBox cache
.fusebox/

# DynamoDB Local files
.dynamodb/

# TernJS port file
.tern-port

# Stores VSCode versions used for testing VSCode extensions
.vscode-test

# yarn v2
.yarn/cache
.yarn/unplugged
.yarn/build-state.yml
.yarn/install-state.gz
.pnp.*

# IDEs and editors
/.idea
.project
.classpath
.c9/
*.launch
.settings/
*.sublime-workspace

# IDE - VSCode
.vscode/*
!.vscode/settings.json
!.vscode/tasks.json
!.vscode/launch.json
!.vscode/extensions.json
.history/*

# misc
.DS_Store
*.pem

# debug
npm-debug.log*
yarn-debug.log*
yarn-error.log*

# local env files
.env*.local

# vercel
.vercel

# typescript
*.tsbuildinfo
next-env.d.ts

# Logs
logs
*.log

# Database
*.db
*.sqlite

# OS generated files
.DS_Store
.DS_Store?
._*
.Spotlight-V100
.Trashes
ehthumbs.db
Thumbs.db

# Temporary files
*.tmp
*.temp
