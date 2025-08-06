# TobixTech Backend Development - Complete Implementation Guide

## Overview
You are tasked with building a production-ready Node.js + Express backend for the TobixTech educational platform. This backend will handle user management, course data, admin authentication, blog posts, and certificate generation with enterprise-level security and performance.

## 🎯 Core Requirements

### Technology Stack
- **Runtime**: Node.js 18+ with TypeScript
- **Framework**: Express.js with TypeScript
- **Database**: MongoDB Atlas (cloud-hosted)
- **Authentication**: JWT tokens with device binding
- **Security**: Helmet, CORS, rate limiting, input validation
- **Deployment**: Fly.io with Docker
- **Monitoring**: Winston logging + health checks

### Project Structure
\`\`\`
tobixtech-backend/
├── src/
│   ├── controllers/          # Route handlers
│   ├── middleware/           # Custom middleware
│   ├── models/              # MongoDB schemas
│   ├── routes/              # API routes
│   ├── services/            # Business logic
│   ├── utils/               # Helper functions
│   ├── types/               # TypeScript types
│   ├── config/              # Configuration
│   └── app.ts               # Express app setup
├── dist/                    # Compiled JavaScript
├── logs/                    # Application logs
├── Dockerfile              # Docker configuration
├── fly.toml                # Fly.io configuration
├── package.json
├── tsconfig.json
└── .env.example
\`\`\`

## 🗄️ Database Schema Design

### Users Collection
\`\`\`typescript
interface User {
  _id: ObjectId
  name: string
  email: string
  phone?: string
  enrolledCourses: ObjectId[]
  completedCourses: ObjectId[]
  certificates: ObjectId[]
  createdAt: Date
  updatedAt: Date
  isActive: boolean
  lastLogin?: Date
  deviceFingerprint?: string
}
\`\`\`

### Courses Collection
\`\`\`typescript
interface Course {
  _id: ObjectId
  id: string                 // URL-friendly ID
  title: string
  description: string
  instructor: string
  duration: string
  level: 'Beginner' | 'Intermediate' | 'Advanced'
  price: number
  originalPrice?: number
  rating: number
  studentsEnrolled: number
  image: string
  category: string
  tags: string[]
  modules: Module[]
  isPublished: boolean
  createdAt: Date
  updatedAt: Date
}

interface Module {
  id: string
  title: string
  description: string
  videoUrl?: string
  duration: string
  resources: Resource[]
  quiz?: Quiz
  order: number
}
\`\`\`

### Admin PINs Collection
\`\`\`typescript
interface AdminPin {
  _id: ObjectId
  pinNumber: string          // Hashed PIN
  pinType: 'PIN1' | 'PIN2'
  deviceFingerprint: string  // Bound to specific device
  isActive: boolean
  createdAt: Date
  lastUsed?: Date
  usageCount: number
  maxUsage?: number
}
\`\`\`

### Blog Posts Collection
\`\`\`typescript
interface BlogPost {
  _id: ObjectId
  id: string                 // URL-friendly ID
  title: string
  content: string
  excerpt: string
  author: string
  category: string
  tags: string[]
  image: string
  isPublished: boolean
  publishedAt?: Date
  createdAt: Date
  updatedAt: Date
  views: number
  likes: number
}
\`\`\`

### Certificates Collection
\`\`\`typescript
interface Certificate {
  _id: ObjectId
  certificateId: string      // Unique certificate ID
  userId: ObjectId
  courseId: ObjectId
  studentName: string
  courseName: string
  instructorName: string
  completionDate: Date
  grade?: string
  courseHours: number
  issuedAt: Date
  isValid: boolean
}
\`\`\`

## 🔐 Security Implementation

### JWT Authentication
\`\`\`typescript
// JWT payload structure
interface JWTPayload {
  adminId: string
  deviceFingerprint: string
  iat: number
  exp: number
}

// Token generation
const generateToken = (adminId: string, deviceFingerprint: string): string => {
  return jwt.sign(
    { adminId, deviceFingerprint },
    process.env.JWT_SECRET!,
    { expiresIn: '4h' }
  )
}
\`\`\`

### Device Fingerprinting
\`\`\`typescript
const generateDeviceFingerprint = (req: Request): string => {
  const userAgent = req.headers['user-agent'] || ''
  const acceptLanguage = req.headers['accept-language'] || ''
  const acceptEncoding = req.headers['accept-encoding'] || ''
  const ip = req.ip || req.connection.remoteAddress || ''
  
  return crypto
    .createHash('sha256')
    .update(`${userAgent}${acceptLanguage}${acceptEncoding}${ip}`)
    .digest('hex')
}
\`\`\`

### Rate Limiting Configuration
\`\`\`typescript
const rateLimitConfig = {
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // Limit each IP to 100 requests per windowMs
  message: 'Too many requests from this IP',
  standardHeaders: true,
  legacyHeaders: false,
}

const authRateLimit = {
  windowMs: 15 * 60 * 1000,
  max: 5, // Limit auth attempts
  skipSuccessfulRequests: true,
}
\`\`\`

## 📡 API Endpoints Specification

### Authentication Routes
\`\`\`typescript
// POST /api/auth/admin-login
interface AdminLoginRequest {
  pin1: string
  pin2: string
  deviceFingerprint: string
}

interface AdminLoginResponse {
  success: boolean
  token?: string
  message: string
  expiresIn?: number
}

// POST /api/auth/verify-token
interface TokenVerifyResponse {
  valid: boolean
  decoded?: JWTPayload
}
\`\`\`

### User Management Routes
\`\`\`typescript
// GET /api/users
interface UsersListResponse {
  users: User[]
  total: number
  page: number
  limit: number
}

// POST /api/users
interface CreateUserRequest {
  name: string
  email: string
  phone?: string
}

// PUT /api/users/:id
interface UpdateUserRequest {
  name?: string
  email?: string
  phone?: string
  isActive?: boolean
}

// DELETE /api/users/:id
interface DeleteUserResponse {
  success: boolean
  message: string
}
\`\`\`

### Course Management Routes
\`\`\`typescript
// GET /api/courses
interface CoursesListResponse {
  courses: Course[]
  total: number
  categories: string[]
}

// GET /api/courses/:id
interface CourseDetailResponse {
  course: Course
  enrolledUsers: number
  completionRate: number
}

// POST /api/courses
interface CreateCourseRequest {
  title: string
  description: string
  instructor: string
  duration: string
  level: string
  price: number
  category: string
  tags: string[]
  modules: Module[]
}
\`\`\`

### Certificate Routes
\`\`\`typescript
// POST /api/certificates/generate
interface GenerateCertificateRequest {
  userId: string
  courseId: string
  grade?: string
}

// GET /api/certificates/:certificateId/verify
interface CertificateVerifyResponse {
  valid: boolean
  certificate?: Certificate
}
\`\`\`

### Blog Management Routes
\`\`\`typescript
// GET /api/blog
interface BlogListResponse {
  posts: BlogPost[]
  total: number
  categories: string[]
}

// POST /api/blog
interface CreateBlogRequest {
  title: string
  content: string
  excerpt: string
  author: string
  category: string
  tags: string[]
  image: string
}
\`\`\`

### Analytics Routes
\`\`\`typescript
// GET /api/analytics/dashboard
interface DashboardAnalytics {
  totalUsers: number
  totalCourses: number
  totalCertificates: number
  totalBlogPosts: number
  recentActivity: Activity[]
  popularCourses: Course[]
  userGrowth: GrowthData[]
}
\`\`\`

## 🛠️ Implementation Requirements

### 1. Express App Setup (src/app.ts)
\`\`\`typescript
import express from 'express'
import cors from 'cors'
import helmet from 'helmet'
import rateLimit from 'express-rate-limit'
import morgan from 'morgan'
import { connectDB } from './config/database'
import { errorHandler } from './middleware/errorHandler'
import { logger } from './utils/logger'

const app = express()

// Security middleware
app.use(helmet())
app.use(cors({
  origin: process.env.FRONTEND_URL,
  credentials: true
}))

// Rate limiting
app.use(rateLimit(rateLimitConfig))

// Body parsing
app.use(express.json({ limit: '10mb' }))
app.use(express.urlencoded({ extended: true }))

// Logging
app.use(morgan('combined', { stream: { write: message => logger.info(message) } }))

// Routes
app.use('/api/auth', authRoutes)
app.use('/api/users', userRoutes)
app.use('/api/courses', courseRoutes)
app.use('/api/blog', blogRoutes)
app.use('/api/certificates', certificateRoutes)
app.use('/api/analytics', analyticsRoutes)

// Health check
app.get('/health', (req, res) => {
  res.json({ status: 'OK', timestamp: new Date().toISOString() })
})

// Error handling
app.use(errorHandler)

export default app
\`\`\`

### 2. Database Connection (src/config/database.ts)
\`\`\`typescript
import mongoose from 'mongoose'
import { logger } from '../utils/logger'

export const connectDB = async (): Promise<void> => {
  try {
    const conn = await mongoose.connect(process.env.MONGODB_URI!, {
      maxPoolSize: 10,
      serverSelectionTimeoutMS: 5000,
      socketTimeoutMS: 45000,
    })
    
    logger.info(`MongoDB Connected: ${conn.connection.host}`)
  } catch (error) {
    logger.error('Database connection error:', error)
    process.exit(1)
  }
}
\`\`\`

### 3. Authentication Middleware (src/middleware/auth.ts)
\`\`\`typescript
import jwt from 'jsonwebtoken'
import { Request, Response, NextFunction } from 'express'
import { AdminPin } from '../models/AdminPin'
import { generateDeviceFingerprint } from '../utils/security'

export const authenticateAdmin = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const token = req.header('Authorization')?.replace('Bearer ', '')
    
    if (!token) {
      res.status(401).json({ message: 'Access denied. No token provided.' })
      return
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET!) as JWTPayload
    const currentFingerprint = generateDeviceFingerprint(req)
    
    if (decoded.deviceFingerprint !== currentFingerprint) {
      res.status(401).json({ message: 'Invalid device. Please login again.' })
      return
    }

    req.admin = decoded
    next()
  } catch (error) {
    res.status(401).json({ message: 'Invalid token.' })
  }
}
\`\`\`

### 4. Error Handling (src/middleware/errorHandler.ts)
\`\`\`typescript
import { Request, Response, NextFunction } from 'express'
import { logger } from '../utils/logger'

export const errorHandler = (
  error: any,
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  logger.error('Error:', {
    message: error.message,
    stack: error.stack,
    url: req.url,
    method: req.method,
    ip: req.ip
  })

  if (error.name === 'ValidationError') {
    res.status(400).json({
      message: 'Validation Error',
      errors: Object.values(error.errors).map((err: any) => err.message)
    })
    return
  }

  if (error.name === 'CastError') {
    res.status(400).json({ message: 'Invalid ID format' })
    return
  }

  if (error.code === 11000) {
    res.status(400).json({ message: 'Duplicate field value' })
    return
  }

  res.status(500).json({
    message: 'Internal Server Error',
    ...(process.env.NODE_ENV === 'development' && { stack: error.stack })
  })
}
\`\`\`

### 5. Logging Configuration (src/utils/logger.ts)
\`\`\`typescript
import winston from 'winston'

export const logger = winston.createLogger({
  level: process.env.LOG_LEVEL || 'info',
  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.errors({ stack: true }),
    winston.format.json()
  ),
  defaultMeta: { service: 'tobixtech-backend' },
  transports: [
    new winston.transports.File({ filename: 'logs/error.log', level: 'error' }),
    new winston.transports.File({ filename: 'logs/combined.log' }),
    new winston.transports.Console({
      format: winston.format.simple()
    })
  ]
})
\`\`\`

## 🐳 Docker Configuration

### Dockerfile
\`\`\`dockerfile
FROM node:18-alpine

WORKDIR /app

# Copy package files
COPY package*.json ./
COPY tsconfig.json ./

# Install dependencies
RUN npm ci --only=production

# Copy source code
COPY src/ ./src/

# Build TypeScript
RUN npm run build

# Create logs directory
RUN mkdir -p logs

# Expose port
EXPOSE 3001

# Health check
HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
  CMD curl -f http://localhost:3001/health || exit 1

# Start application
CMD ["npm", "start"]
\`\`\`

### fly.toml
\`\`\`toml
app = "tobixtech-backend"
primary_region = "iad"

[build]
  dockerfile = "Dockerfile"

[env]
  NODE_ENV = "production"
  PORT = "3001"

[[services]]
  http_checks = []
  internal_port = 3001
  processes = ["app"]
  protocol = "tcp"
  script_checks = []

  [services.concurrency]
    hard_limit = 25
    soft_limit = 20
    type = "connections"

  [[services.ports]]
    force_https = true
    handlers = ["http"]
    port = 80

  [[services.ports]]
    handlers = ["tls", "http"]
    port = 443

  [[services.tcp_checks]]
    grace_period = "1s"
    interval = "15s"
    restart_limit = 0
    timeout = "2s"

[metrics]
  port = 9091
  path = "/metrics"
\`\`\`

## 🚀 Deployment Instructions

### 1. Environment Variables
\`\`\`env
# Database
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/tobixtech

# Security
JWT_SECRET=your-super-secure-jwt-secret-key-minimum-32-characters
BCRYPT_ROUNDS=12

# Server
PORT=3001
NODE_ENV=production
FRONTEND_URL=https://your-frontend-domain.vercel.app

# Admin PINs (for seeding)
SEED_ADMIN_PIN1=123456
SEED_ADMIN_PIN2=789012

# Logging
LOG_LEVEL=info

# Rate Limiting
RATE_LIMIT_WINDOW_MS=900000
RATE_LIMIT_MAX_REQUESTS=100
\`\`\`

### 2. MongoDB Atlas Setup
1. Create MongoDB Atlas account
2. Create new cluster
3. Set up database user with read/write permissions
4. Configure network access (allow all IPs for production: 0.0.0.0/0)
5. Get connection string and add to MONGODB_URI

### 3. Fly.io Deployment
\`\`\`bash
# Install Fly CLI
curl -L https://fly.io/install.sh | sh

# Login to Fly
fly auth login

# Initialize app
fly launch

# Set secrets
fly secrets set MONGODB_URI="your-mongodb-connection-string"
fly secrets set JWT_SECRET="your-jwt-secret"
fly secrets set SEED_ADMIN_PIN1="123456"
fly secrets set SEED_ADMIN_PIN2="789012"

# Deploy
fly deploy
\`\`\`

## 🧪 Testing Requirements

### 1. Unit Tests
- Test all controller functions
- Test middleware functionality
- Test utility functions
- Test database models

### 2. Integration Tests
- Test API endpoints
- Test authentication flow
- Test database operations
- Test error handling

### 3. Load Testing
- Test concurrent user handling
- Test rate limiting
- Test database performance
- Test memory usage

## 📊 Monitoring & Analytics

### 1. Health Checks
- Database connectivity
- Memory usage
- Response times
- Error rates

### 2. Logging
- Request/response logging
- Error logging
- Performance metrics
- Security events

### 3. Metrics Collection
- API usage statistics
- User activity tracking
- Course completion rates
- Certificate generation metrics

## 🔧 Additional Features

### 1. Email Integration (Optional)
- Welcome emails for new users
- Course completion notifications
- Certificate delivery via email

### 2. File Upload (Optional)
- Course material uploads
- User profile pictures
- Blog post images

### 3. Backup Strategy
- Automated database backups
- Data export functionality
- Disaster recovery plan

## ✅ Implementation Checklist

### Phase 1: Core Setup
- [ ] Project structure setup
- [ ] TypeScript configuration
- [ ] Express app configuration
- [ ] MongoDB connection
- [ ] Basic middleware setup

### Phase 2: Authentication
- [ ] JWT implementation
- [ ] Device fingerprinting
- [ ] Admin PIN system
- [ ] Rate limiting
- [ ] Security middleware

### Phase 3: API Development
- [ ] User management endpoints
- [ ] Course management endpoints
- [ ] Blog management endpoints
- [ ] Certificate generation
- [ ] Analytics endpoints

### Phase 4: Testing & Deployment
- [ ] Unit tests
- [ ] Integration tests
- [ ] Docker configuration
- [ ] Fly.io deployment
- [ ] Environment setup

### Phase 5: Monitoring
- [ ] Logging implementation
- [ ] Health checks
- [ ] Performance monitoring
- [ ] Error tracking

## 🎯 Success Criteria

1. **Performance**: API response times < 200ms for 95% of requests
2. **Security**: All endpoints properly authenticated and rate-limited
3. **Reliability**: 99.9% uptime with proper error handling
4. **Scalability**: Handle 1000+ concurrent users
5. **Maintainability**: Clean, documented, and testable code

## 📞 Support & Documentation

After implementation, provide:
1. Complete API documentation
2. Deployment guide
3. Troubleshooting guide
4. Performance optimization tips
5. Security best practices

---

This comprehensive prompt provides everything needed to build a production-ready backend for the TobixTech platform. Follow each section carefully and implement all security measures for a robust, scalable solution.
\`\`\`plaintext file=".gitignore"
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
