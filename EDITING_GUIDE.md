# TobixTech Website Editing Guide

## 📋 Overview
This guide explains how to edit and customize the TobixTech educational platform. The website is built with Next.js 14, TypeScript, and Tailwind CSS.

## 🏗️ Project Structure

\`\`\`
├── app/                    # Next.js App Router pages
│   ├── about/             # About page
│   ├── contact/           # Contact page
│   ├── courses/           # Course pages and content
│   ├── projects/          # Projects showcase
│   ├── skills/            # Skills page
│   ├── blog/              # Blog functionality
│   ├── become-tutor/      # Tutor application
│   ├── admin-login/       # Admin authentication
│   └── Adminpage/         # Admin dashboard
├── components/            # Reusable React components
│   ├── ui/               # shadcn/ui components
│   ├── navigation.tsx    # Main navigation
│   ├── footer.tsx        # Site footer
│   ├── course-card.tsx   # Course display cards
│   ├── module-survey.tsx # Module quizzes
│   ├── final-survey.tsx  # Final course assessment
│   └── certificate-generator.tsx # Certificate creation
├── public/               # Static assets
└── styles/              # Global styles
\`\`\`

## 🎨 Design System

### Colors
- Primary: Blue (#3B82F6)
- Success: Green (#10B981)
- Warning: Yellow (#F59E0B)
- Error: Red (#EF4444)

### Typography
- Headings: Inter font family
- Body: System font stack
- Code: Monospace

## 📚 Course Management

### Adding New Courses

1. **Create Course Entry Page**
   \`\`\`typescript
   // app/courses/[new-course-id]/page.tsx
   export default function NewCoursePage() {
     // Course overview and PIN entry
   }
   \`\`\`

2. **Create Course Content Page**
   \`\`\`typescript
   // app/courses/[new-course-id]/content/page.tsx
   export default function NewCourseContent() {
     // Course modules and content
   }
   \`\`\`

3. **Update Course Data**
   \`\`\`typescript
   // In app/courses/[courseId]/page.tsx
   const courseData = {
     "new-course-id": {
       title: "Course Title",
       description: "Course description",
       price: "$99",
       modules: ["Module 1", "Module 2", "Module 3"]
     }
   }
   \`\`\`

### Course Structure
Each course should have:
- **Modules**: Individual learning units
- **Module Surveys**: Quick assessments after each module
- **Final Assessment**: Comprehensive test before certificate
- **Certificate**: Generated upon successful completion

### Module Format
\`\`\`typescript
const modules = [
  {
    id: 1,
    title: "Module Title",
    content: {
      title: "Content Title",
      description: "Module description",
      learningObjectives: ["Objective 1", "Objective 2"],
      steps: [
        {
          title: "Step Title",
          content: "Step content",
          tips: "Pro tips for this step"
        }
      ]
    },
    survey: [
      {
        question: "Question text",
        options: ["Option 1", "Option 2", "Option 3", "Option 4"],
        correct: 1 // Index of correct answer
      }
    ]
  }
]
\`\`\`

## 🔐 Authentication & Access Control

### PIN System
- Courses use a 5-digit PIN system for access
- PINs are validated via `/api/validate-pin`
- Valid PINs are stored in cookies for session management

### Admin System
- Admin login at `/admin-login`
- Admin dashboard at `/Adminpage`
- Protected routes use middleware for authentication

## 🎓 Certificate System

### Certificate Data Structure
\`\`\`typescript
const certificateData = {
  studentName: "Student Name",
  courseName: "Course Name",
  completionDate: "MM/DD/YYYY",
  certificateId: "CERT-COURSE-TIMESTAMP",
  instructorName: "Instructor Name",
  courseHours: 40,
  grade: "A+"
}
\`\`\`

### Certificate Generation
- Certificates are generated client-side using HTML5 Canvas
- Downloadable as PNG images
- Include QR codes for verification (optional)

## 🛠️ Backend & API Requirements

### Database Schema (Recommended)

#### Users Table
\`\`\`sql
CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  email VARCHAR(255) UNIQUE NOT NULL,
  name VARCHAR(255) NOT NULL,
  password_hash VARCHAR(255),
  role VARCHAR(50) DEFAULT 'student',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
\`\`\`

#### Courses Table
\`\`\`sql
CREATE TABLE courses (
  id VARCHAR(50) PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  description TEXT,
  price DECIMAL(10,2),
  duration_hours INTEGER,
  status VARCHAR(20) DEFAULT 'active',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
\`\`\`

#### Course Access Table
\`\`\`sql
CREATE TABLE course_access (
  id SERIAL PRIMARY KEY,
  user_id INTEGER REFERENCES users(id),
  course_id VARCHAR(50) REFERENCES courses(id),
  pin VARCHAR(5) NOT NULL,
  access_granted_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  expires_at TIMESTAMP,
  UNIQUE(user_id, course_id)
);
\`\`\`

#### User Progress Table
\`\`\`sql
CREATE TABLE user_progress (
  id SERIAL PRIMARY KEY,
  user_id INTEGER REFERENCES users(id),
  course_id VARCHAR(50) REFERENCES courses(id),
  module_id INTEGER NOT NULL,
  completed_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  score INTEGER,
  UNIQUE(user_id, course_id, module_id)
);
\`\`\`

#### Certificates Table
\`\`\`sql
CREATE TABLE certificates (
  id SERIAL PRIMARY KEY,
  user_id INTEGER REFERENCES users(id),
  course_id VARCHAR(50) REFERENCES courses(id),
  certificate_id VARCHAR(100) UNIQUE NOT NULL,
  final_score INTEGER NOT NULL,
  issued_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  certificate_url TEXT
);
\`\`\`

### Required API Endpoints

#### Authentication
- `POST /api/auth/login` - User login
- `POST /api/auth/register` - User registration
- `POST /api/auth/logout` - User logout
- `GET /api/auth/me` - Get current user

#### Course Management
- `GET /api/courses` - List all courses
- `GET /api/courses/[id]` - Get course details
- `POST /api/validate-pin` - Validate course PIN
- `GET /api/courses/[id]/progress` - Get user progress

#### Progress Tracking
- `POST /api/progress/module` - Save module completion
- `POST /api/progress/survey` - Save survey results
- `GET /api/progress/[courseId]` - Get course progress

#### Certificates
- `POST /api/certificates/generate` - Generate certificate
- `GET /api/certificates/[id]` - Get certificate details
- `GET /api/certificates/verify/[id]` - Verify certificate

### Environment Variables
\`\`\`env
# Database
DATABASE_URL=postgresql://user:password@localhost:5432/tobixtech
NEXTAUTH_SECRET=your-secret-key
NEXTAUTH_URL=http://localhost:3000

# Email (for notifications)
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your-email@gmail.com
SMTP_PASS=your-app-password

# File Storage (for certificates)
AWS_ACCESS_KEY_ID=your-access-key
AWS_SECRET_ACCESS_KEY=your-secret-key
AWS_BUCKET_NAME=tobixtech-certificates

# Admin
ADMIN_EMAIL=admin@tobixtech.com
ADMIN_PASSWORD=secure-admin-password
\`\`\`

### Recommended Tech Stack

#### Database Options
1. **Supabase** (Recommended for beginners)
   - Built-in authentication
   - Real-time subscriptions
   - Easy setup and deployment

2. **PostgreSQL + Prisma** (For advanced users)
   - Type-safe database access
   - Migration management
   - Better performance control

#### Authentication
1. **NextAuth.js** (Recommended)
   - Multiple providers support
   - Session management
   - Security best practices

2. **Supabase Auth** (If using Supabase)
   - Integrated with database
   - Built-in user management

#### File Storage
1. **Vercel Blob** (Simple)
2. **AWS S3** (Scalable)
3. **Supabase Storage** (If using Supabase)

### Integration Steps

1. **Set up Database**
   \`\`\`bash
   # Using Supabase
   npx supabase init
   npx supabase start
   
   # Using Prisma
   npm install prisma @prisma/client
   npx prisma init
   \`\`\`

2. **Configure Authentication**
   \`\`\`bash
   npm install next-auth
   # Configure providers in [...nextauth].ts
   \`\`\`

3. **Add Environment Variables**
   \`\`\`bash
   cp .env.example .env.local
   # Fill in your values
   \`\`\`

4. **Deploy Database Schema**
   \`\`\`bash
   # Supabase
   npx supabase db push
   
   # Prisma
   npx prisma db push
   \`\`\`

## 🎯 Customization

### Styling
- Uses Tailwind CSS for styling
- Custom CSS in `styles/globals.css`
- Component-specific styles in component files

### Adding New Pages
1. Create page in `app/` directory
2. Add navigation link in `components/navigation.tsx`
3. Update footer links if needed

### Modifying Components
- UI components are in `components/ui/`
- Custom components are in `components/`
- Follow existing patterns for consistency

## 🚀 Deployment

### Vercel (Recommended)
1. Connect GitHub repository
2. Set environment variables
3. Deploy automatically on push

### Other Platforms
- Netlify: Similar to Vercel
- Railway: Good for full-stack apps
- AWS/GCP: More complex but scalable

## 🔧 Development

### Getting Started
\`\`\`bash
npm install
npm run dev
\`\`\`

### Building for Production
\`\`\`bash
npm run build
npm start
\`\`\`

### Code Quality
\`\`\`bash
npm run lint
npm run type-check
\`\`\`

## 📞 Support

For technical support or questions about customization:
- Email: tobixtech@gmail.com
- Documentation: Check component comments
- Issues: Create GitHub issues for bugs

---

**Note**: This is a comprehensive guide. Start with basic customizations and gradually implement more advanced features as needed.
