# TobixTech Platform Backend Development Guide

## Overview
This document provides comprehensive instructions for developing the backend API for the TobixTech educational platform. The backend should be built using Node.js with Express.js and include all necessary endpoints for user management, course management, authentication, and content delivery.

## Technology Stack
- **Runtime**: Node.js (v18+)
- **Framework**: Express.js
- **Database**: MongoDB with Mongoose ODM
- **Authentication**: JWT (JSON Web Tokens)
- **File Storage**: Local filesystem or cloud storage (AWS S3/Cloudinary)
- **Environment**: dotenv for configuration
- **CORS**: Enable cross-origin requests
- **Security**: bcryptjs for password hashing, helmet for security headers

## Required Environment Variables
Create a `.env` file with the following variables:

\`\`\`env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/tobixtech
JWT_SECRET=your-super-secure-jwt-secret-key-here
ADMIN_USERNAME=admin
ADMIN_PASSWORD=your-secure-admin-password
NODE_ENV=development
CORS_ORIGIN=http://localhost:3000
\`\`\`

## Database Schema

### Users Collection
\`\`\`javascript
{
  _id: ObjectId,
  name: String (required),
  email: String (required, unique),
  phone: String,
  enrolledCourses: [String], // Course IDs
  completedModules: [String], // Module IDs
  certificates: [String], // Certificate IDs
  createdAt: Date,
  updatedAt: Date
}
\`\`\`

### Courses Collection
\`\`\`javascript
{
  _id: ObjectId,
  id: String (required, unique), // URL-friendly ID
  title: String (required),
  description: String (required),
  instructor: String (required),
  duration: String (required),
  level: String (required), // beginner, intermediate, advanced
  price: Number (required),
  image: String, // Image URL
  category: String (required),
  tags: [String],
  modules: [{
    id: String,
    title: String,
    description: String,
    videoUrl: String,
    duration: String,
    resources: [String]
  }],
  requirements: [String],
  whatYouWillLearn: [String],
  isActive: Boolean (default: true),
  enrollmentCount: Number (default: 0),
  rating: Number (default: 0),
  reviews: [{
    userId: String,
    name: String,
    rating: Number,
    comment: String,
    date: Date
  }],
  createdAt: Date,
  updatedAt: Date
}
\`\`\`

### Pins Collection
\`\`\`javascript
{
  _id: ObjectId,
  courseId: String (required), // Course ID
  pin: String (required, unique), // 6-digit PIN
  isUsed: Boolean (default: false),
  usedBy: String, // User ID who used the PIN
  usedAt: Date,
  createdAt: Date,
  expiresAt: Date
}
\`\`\`

### Blog Posts Collection
\`\`\`javascript
{
  _id: ObjectId,
  id: String (required, unique),
  title: String (required),
  content: String (required),
  excerpt: String (required),
  author: String (required),
  category: String (required),
  tags: [String],
  image: String, // Featured image URL
  isPublished: Boolean (default: false),
  publishedAt: Date,
  createdAt: Date,
  updatedAt: Date
}
\`\`\`

### Tutor Applications Collection
\`\`\`javascript
{
  _id: ObjectId,
  name: String (required),
  email: String (required),
  phone: String (required),
  expertise: [String] (required),
  experience: String (required),
  portfolio: String,
  motivation: String (required),
  status: String (default: 'pending'), // pending, approved, rejected
  submittedAt: Date,
  reviewedAt: Date,
  reviewedBy: String
}
\`\`\`

## Required API Endpoints

### Authentication Endpoints

#### POST /api/admin/auth
Admin login endpoint
\`\`\`javascript
// Request body
{
  "username": "admin",
  "password": "admin_password"
}

// Response
{
  "success": true,
  "token": "jwt_token_here",
  "admin": {
    "username": "admin",
    "role": "admin"
  }
}
\`\`\`

### User Management Endpoints

#### GET /api/admin/users
Get all users (admin only)
\`\`\`javascript
// Response
{
  "success": true,
  "users": [
    {
      "_id": "user_id",
      "name": "John Doe",
      "email": "john@example.com",
      "phone": "+1234567890",
      "enrolledCourses": ["course1", "course2"],
      "completedModules": ["module1", "module2"],
      "createdAt": "2024-01-01T00:00:00.000Z"
    }
  ]
}
\`\`\`

#### POST /api/admin/users
Create new user (admin only)
\`\`\`javascript
// Request body
{
  "name": "John Doe",
  "email": "john@example.com",
  "phone": "+1234567890"
}
\`\`\`

#### PUT /api/admin/users/:id
Update user (admin only)

#### DELETE /api/admin/users/:id
Delete user (admin only)

### Course Management Endpoints

#### GET /api/courses
Get all active courses (public)
\`\`\`javascript
// Response
{
  "success": true,
  "courses": [
    {
      "_id": "course_id",
      "id": "web-development-fundamentals",
      "title": "Web Development Fundamentals",
      "description": "Learn the basics of web development",
      "instructor": "John Smith",
      "duration": "8 weeks",
      "level": "beginner",
      "price": 299,
      "image": "/images/web-dev.jpg",
      "category": "Web Development",
      "enrollmentCount": 150,
      "rating": 4.8
    }
  ]
}
\`\`\`

#### GET /api/courses/:courseId
Get specific course details (public)

#### GET /api/courses/:courseId/content
Get course content (requires valid PIN)
\`\`\`javascript
// Headers
{
  "x-course-pin": "123456"
}

// Response
{
  "success": true,
  "course": {
    "id": "web-development-fundamentals",
    "title": "Web Development Fundamentals",
    "modules": [
      {
        "id": "module1",
        "title": "Introduction to HTML",
        "description": "Learn HTML basics",
        "videoUrl": "/videos/html-intro.mp4",
        "duration": "45 minutes",
        "resources": ["/resources/html-cheatsheet.pdf"]
      }
    ]
  }
}
\`\`\`

#### POST /api/admin/courses
Create new course (admin only)

#### PUT /api/admin/courses/:id
Update course (admin only)

#### DELETE /api/admin/courses/:id
Delete course (admin only)

### PIN Management Endpoints

#### GET /api/admin/pins
Get all PINs (admin only)
\`\`\`javascript
// Response
{
  "success": true,
  "pins": [
    {
      "_id": "pin_id",
      "courseId": "web-development-fundamentals",
      "pin": "123456",
      "isUsed": false,
      "createdAt": "2024-01-01T00:00:00.000Z",
      "expiresAt": "2024-12-31T23:59:59.999Z"
    }
  ]
}
\`\`\`

#### POST /api/admin/pins
Generate new PIN (admin only)
\`\`\`javascript
// Request body
{
  "courseId": "web-development-fundamentals",
  "expiresAt": "2024-12-31T23:59:59.999Z"
}

// Response
{
  "success": true,
  "pin": {
    "courseId": "web-development-fundamentals",
    "pin": "123456",
    "expiresAt": "2024-12-31T23:59:59.999Z"
  }
}
\`\`\`

#### POST /api/validate-pin
Validate course PIN (public)
\`\`\`javascript
// Request body
{
  "pin": "123456",
  "courseId": "web-development-fundamentals"
}

// Response
{
  "success": true,
  "valid": true,
  "message": "PIN is valid"
}
\`\`\`

#### DELETE /api/admin/pins/:id
Delete PIN (admin only)

### Blog Management Endpoints

#### GET /api/blog-posts
Get all published blog posts (public)
\`\`\`javascript
// Response
{
  "success": true,
  "posts": [
    {
      "_id": "post_id",
      "id": "getting-started-with-react",
      "title": "Getting Started with React",
      "excerpt": "Learn the basics of React development",
      "author": "Jane Doe",
      "category": "React",
      "image": "/images/react-intro.jpg",
      "publishedAt": "2024-01-01T00:00:00.000Z"
    }
  ]
}
\`\`\`

#### GET /api/blog-posts/:id
Get specific blog post (public)

#### GET /api/admin/blog-posts
Get all blog posts including drafts (admin only)

#### POST /api/admin/blog-posts
Create new blog post (admin only)
\`\`\`javascript
// Request body
{
  "title": "Getting Started with React",
  "content": "Full blog post content here...",
  "excerpt": "Learn the basics of React development",
  "author": "Jane Doe",
  "category": "React",
  "tags": ["react", "javascript", "frontend"],
  "image": "/images/react-intro.jpg",
  "isPublished": true
}
\`\`\`

#### PUT /api/admin/blog-posts/:id
Update blog post (admin only)

#### DELETE /api/admin/blog-posts/:id
Delete blog post (admin only)

### Course Reviews Endpoints

#### GET /api/course-reviews/:courseId
Get reviews for a specific course (public)

#### POST /api/course-reviews
Submit course review (public)
\`\`\`javascript
// Request body
{
  "courseId": "web-development-fundamentals",
  "name": "John Doe",
  "rating": 5,
  "comment": "Excellent course!"
}
\`\`\`

### Tutor Application Endpoints

#### POST /api/tutor-application
Submit tutor application (public)
\`\`\`javascript
// Request body
{
  "name": "Jane Smith",
  "email": "jane@example.com",
  "phone": "+1234567890",
  "expertise": ["React", "Node.js", "MongoDB"],
  "experience": "5 years of full-stack development",
  "portfolio": "https://janesmith.dev",
  "motivation": "I want to help others learn programming"
}
\`\`\`

#### GET /api/admin/tutor-applications
Get all tutor applications (admin only)

#### PUT /api/admin/tutor-applications/:id
Update tutor application status (admin only)

## Security Requirements

1. **CORS Configuration**: Allow requests from frontend domain
2. **Rate Limiting**: Implement rate limiting for API endpoints
3. **Input Validation**: Validate all input data
4. **Error Handling**: Proper error responses without exposing sensitive information
5. **JWT Authentication**: Secure admin endpoints with JWT tokens
6. **Password Hashing**: Hash admin passwords using bcryptjs
7. **Environment Variables**: Use environment variables for sensitive data

## File Structure
\`\`\`
backend/
├── src/
│   ├── controllers/
│   │   ├── authController.js
│   │   ├── userController.js
│   │   ├── courseController.js
│   │   ├── pinController.js
│   │   ├── blogController.js
│   │   └── tutorController.js
│   ├── models/
│   │   ├── User.js
│   │   ├── Course.js
│   │   ├── Pin.js
│   │   ├── BlogPost.js
│   │   └── TutorApplication.js
│   ├── routes/
│   │   ├── auth.js
│   │   ├── users.js
│   │   ├── courses.js
│   │   ├── pins.js
│   │   ├── blog.js
│   │   └── tutors.js
│   ├── middleware/
│   │   ├── auth.js
│   │   ├── validation.js
│   │   └── errorHandler.js
│   ├── utils/
│   │   ├── generatePin.js
│   │   └── helpers.js
│   └── app.js
├── package.json
├── .env
└── server.js
\`\`\`

## Sample Data

### Sample Courses
\`\`\`javascript
[
  {
    "id": "web-development-fundamentals",
    "title": "Web Development Fundamentals",
    "description": "Master the essential skills of modern web development. Learn HTML5, CSS3, JavaScript, and responsive design principles to build stunning websites from scratch.",
    "instructor": "John Smith",
    "duration": "8 weeks",
    "level": "beginner",
    "price": 299,
    "image": "/images/web-dev-course.jpg",
    "category": "Web Development",
    "tags": ["HTML", "CSS", "JavaScript", "Responsive Design"],
    "modules": [
      {
        "id": "html-basics",
        "title": "HTML Fundamentals",
        "description": "Learn the structure and semantics of HTML5",
        "videoUrl": "/videos/html-fundamentals.mp4",
        "duration": "2 hours",
        "resources": ["/resources/html-cheatsheet.pdf"]
      },
      {
        "id": "css-styling",
        "title": "CSS Styling and Layout",
        "description": "Master CSS for beautiful and responsive designs",
        "videoUrl": "/videos/css-styling.mp4",
        "duration": "3 hours",
        "resources": ["/resources/css-guide.pdf"]
      }
    ],
    "requirements": ["Basic computer skills", "Text editor"],
    "whatYouWillLearn": [
      "HTML5 semantic markup",
      "CSS3 styling and animations",
      "JavaScript fundamentals",
      "Responsive web design",
      "Modern development workflow"
    ]
  },
  {
    "id": "react-nextjs-bootcamp",
    "title": "React & Next.js Bootcamp",
    "description": "Build modern, scalable web applications with React and Next.js. Learn component-based architecture, state management, and server-side rendering.",
    "instructor": "Sarah Johnson",
    "duration": "12 weeks",
    "level": "intermediate",
    "price": 499,
    "image": "/images/react-nextjs-course.jpg",
    "category": "Frontend Development",
    "tags": ["React", "Next.js", "JavaScript", "TypeScript"]
  },
  {
    "id": "meta-facebook-ads",
    "title": "Meta Facebook Ads Mastery",
    "description": "Learn to create, manage, and optimize Facebook and Instagram ad campaigns. Master audience targeting, ad creative, and campaign optimization.",
    "instructor": "Mike Chen",
    "duration": "6 weeks",
    "level": "beginner",
    "price": 199,
    "image": "/images/facebook-ads-course.jpg",
    "category": "Digital Marketing",
    "tags": ["Facebook Ads", "Instagram Ads", "Digital Marketing", "ROI"]
  }
]
\`\`\`

### Sample Blog Posts
\`\`\`javascript
[
  {
    "id": "getting-started-with-web-development",
    "title": "Getting Started with Web Development in 2024",
    "content": "Web development continues to evolve rapidly...",
    "excerpt": "A comprehensive guide for beginners starting their web development journey",
    "author": "TobixTech Team",
    "category": "Web Development",
    "tags": ["beginner", "web development", "career"],
    "image": "/images/web-dev-2024.jpg",
    "isPublished": true,
    "publishedAt": "2024-01-15T10:00:00.000Z"
  }
]
\`\`\`

## Testing Requirements

1. **Unit Tests**: Test individual functions and methods
2. **Integration Tests**: Test API endpoints
3. **Authentication Tests**: Test JWT token validation
4. **Database Tests**: Test database operations
5. **Error Handling Tests**: Test error scenarios

## Deployment Considerations

1. **Environment Configuration**: Separate configs for development, staging, and production
2. **Database Connection**: Ensure proper MongoDB connection handling
3. **Logging**: Implement comprehensive logging
4. **Health Checks**: Add health check endpoints
5. **Documentation**: API documentation using tools like Swagger

## Additional Features to Implement

1. **Email Notifications**: Send emails for course enrollment, completion, etc.
2. **File Upload**: Handle image and video uploads
3. **Search Functionality**: Search courses and blog posts
4. **Analytics**: Track user engagement and course progress
5. **Caching**: Implement Redis caching for better performance

This backend should provide a robust foundation for the TobixTech platform with all necessary functionality for user management, course delivery, content management, and administrative operations.
\`\`\`

```plaintext file=".gitignore"
# Dependencies
node_modules/
npm-debug.log*
yarn-debug.log*
yarn-error.log*
pnpm-debug.log*

# Next.js
.next/
out/
build/
dist/

# Environment variables
.env
.env.local
.env.development.local
.env.test.local
.env.production.local

# Vercel
.vercel

# TypeScript
*.tsbuildinfo
next-env.d.ts

# IDE
.vscode/
.idea/
*.swp
*.swo

# OS
.DS_Store
Thumbs.db

# Logs
logs/
*.log

# Runtime data
pids/
*.pid
*.seed
*.pid.lock

# Coverage directory used by tools like istanbul
coverage/
*.lcov

# nyc test coverage
.nyc_output

# Dependency directories
jspm_packages/

# Optional npm cache directory
.npm

# Optional eslint cache
.eslintcache

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

# parcel-bundler cache (https://parceljs.org/)
.cache
.parcel-cache

# Stores VSCode versions used for testing VSCode extensions
.vscode-test

# Temporary folders
tmp/
temp/

# Editor directories and files
.vscode/*
!.vscode/extensions.json
.idea
*.suo
*.ntvs*
*.njsproj
*.sln
*.sw?
