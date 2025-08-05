# TobixTech Platform - Complete Editing & Deployment Guide

## 🚀 Quick Start Deployment

### 1. **Environment Variables Setup**

Create a `.env.local` file in the root directory:
\`\`\`env
BACKEND_URL=https://your-backend-api.com
JWT_SECRET=your-super-secure-jwt-secret-key
\`\`\`

**Generate JWT Secret:**
\`\`\`bash
node -e "console.log(require('crypto').randomBytes(64).toString('hex'))"
\`\`\`

### 2. **Backend Deployment**

1. **Use the comprehensive backend prompt** (`BACKEND_DEVELOPMENT_PROMPT.md`) with Gemini AI
2. **Deploy generated backend to Fly.io**
3. **Update `BACKEND_URL` in Vercel** with your Fly.io app URL

### 3. **Frontend Deployment**

1. **Push to GitHub** (auto-deploys to Vercel)
2. **Set environment variables** in Vercel dashboard
3. **Deploy and test** all functionality

---

## 📁 Project Structure & Key Files

\`\`\`
tobixtech-platform/
├── app/                    # Next.js App Router pages
│   ├── Adminpage/         # Admin dashboard
│   ├── admin-login/       # Admin authentication
│   ├── api/               # API routes
│   ├── courses/           # Course pages
│   ├── blog/              # Blog section
│   ├── contact/           # Contact page
│   ├── projects/          # Projects showcase
│   ├── skills/            # Skills page
│   ├── about/             # About page
│   ├── become-tutor/      # Tutor application
│   ├── globals.css        # Global styles
│   ├── layout.tsx         # Root layout
│   └── page.tsx           # Home page
├── components/            # Reusable components
│   ├── ui/                # shadcn/ui components
│   ├── certificate-generator.tsx
│   ├── course-card.tsx
│   ├── course-reviews.tsx
│   ├── final-survey.tsx
│   ├── footer.tsx
│   ├── language-switcher.tsx
│   ├── module-survey.tsx
│   ├── navigation.tsx
│   ├── theme-provider.tsx
│   └── theme-toggle.tsx
├── hooks/                 # Custom React hooks
├── lib/                   # Utility functions
├── public/                # Static assets
├── middleware.ts          # Next.js middleware
└── package.json           # Dependencies
\`\`\`

---

## 🔐 Security System Overview

### **Admin Authentication Flow**
1. **Two-PIN Entry** → Admin enters PIN1 + PIN2
2. **Backend Validation** → Verifies PINs against database
3. **JWT Token Generation** → 4-hour secure session
4. **Dashboard Access** → Full admin capabilities

### **Course Access Flow**
1. **PIN Entry** → Student enters course PIN
2. **Device Binding** → PIN permanently locked to device
3. **Content Access** → Secure course content delivery
4. **Progress Tracking** → Completion monitoring

---

## 🛠️ Customization Guide

### **1. Branding & Styling**

**Colors & Theme (`app/globals.css`):**
\`\`\`css
:root {
  --primary: #3b82f6;        /* Blue primary */
  --primary-dark: #2563eb;   /* Darker blue */
  --accent: #8b5cf6;         /* Purple accent */
  --dark: #1e293b;           /* Dark theme */
  --light: #f8fafc;          /* Light theme */
}
\`\`\`

**Logo & Assets:**
- Replace files in `/public/` directory
- Update references in components

### **2. Course Content**

**Adding New Courses (`data/courses.json`):**
\`\`\`json
{
  "id": "new-course-id",
  "title": "New Course Title",
  "description": "Course description",
  "duration": "30 hours",
  "level": "Beginner",
  "price": 299,
  "modules": [...]
}
\`\`\`

**Course Content Pages:**
- Create new page: `app/courses/[courseId]/content/page.tsx`
- Follow existing course structure

### **3. Admin Dashboard**

**Adding New Admin Features:**
1. Create API route in `app/api/admin/`
2. Add UI components in admin dashboard
3. Update navigation and permissions

### **4. PIN System Configuration**

**PIN Generation Settings:**
- Length: 6-8 characters
- Expiration: Configurable per course
- Device binding: Automatic on first use
- Multiple PINs: Supported per course

---

## 🔧 API Endpoints Reference

### **Admin Endpoints**
\`\`\`
POST /api/admin/auth          # Admin login
GET  /api/admin/users         # Get all users
POST /api/admin/users         # Create user
PUT  /api/admin/users/[id]    # Update user
DELETE /api/admin/users/[id]  # Delete user

GET  /api/admin/pins          # Get all PINs
POST /api/admin/pins          # Create PIN
PUT  /api/admin/pins/[id]     # Update PIN
DELETE /api/admin/pins/[id]   # Delete PIN

GET  /api/admin/courses       # Get all courses
POST /api/admin/courses       # Create course
PUT  /api/admin/courses/[id]  # Update course
DELETE /api/admin/courses/[id] # Delete course

GET  /api/admin/blog-posts    # Get all blog posts
POST /api/admin/blog-posts    # Create blog post
PUT  /api/admin/blog-posts/[id] # Update blog post
DELETE /api/admin/blog-posts/[id] # Delete blog post
\`\`\`

### **Public Endpoints**
\`\`\`
POST /api/validate-pin        # Validate course PIN
GET  /api/courses/[courseId]/content # Get course content
POST /api/course-reviews      # Submit course review
POST /api/tutor-application   # Submit tutor application
\`\`\`

---

## 🐛 Troubleshooting Guide

### **Common Deployment Issues**

**1. Environment Variables Not Set**
\`\`\`
Error: BACKEND_URL is not defined
Solution: Add BACKEND_URL to Vercel environment variables
\`\`\`

**2. JWT Secret Missing**
\`\`\`
Error: JWT_SECRET is required
Solution: Generate and add JWT_SECRET to environment variables
\`\`\`

**3. Backend Connection Failed**
\`\`\`
Error: Failed to fetch from backend
Solution: Verify BACKEND_URL is correct and backend is deployed
\`\`\`

**4. Tailwind CSS Not Loading**
\`\`\`
Error: Styles not applying
Solution: Ensure @tailwind directives are at top of globals.css
\`\`\`

### **Development Issues**

**1. TypeScript Errors**
\`\`\`bash
npm run type-check  # Check for type errors
\`\`\`

**2. Build Failures**
\`\`\`bash
npm run build      # Test production build locally
\`\`\`

**3. Dependency Issues**
\`\`\`bash
rm -rf node_modules package-lock.json
npm install        # Fresh dependency install
\`\`\`

---

## 📊 Performance Optimization

### **1. Image Optimization**
- Use Next.js `Image` component
- Optimize images before upload
- Use WebP format when possible

### **2. Code Splitting**
- Dynamic imports for heavy components
- Lazy loading for course content
- Route-based code splitting (automatic)

### **3. Caching Strategy**
- Static assets cached by Vercel CDN
- API responses cached appropriately
- Database queries optimized

---

## 🔒 Security Best Practices

### **Environment Variables**
- Never commit `.env` files to version control
- Use different secrets for development and production
- Rotate JWT secrets regularly

### **API Security**
- Implement rate limiting
- Validate all inputs
- Use HTTPS in production
- Implement proper CORS policies

### **Authentication**
- Use secure, random JWT secrets
- Implement token expiration
- Add device binding for admin accounts
- Log authentication attempts

---

## 📊 Analytics Integration

### Google Analytics
Add to `app/layout.tsx`:
\`\`\`tsx
import Script from 'next/script'

export default function RootLayout({ children }) {
  return (
    <html>
      <head>
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=GA_MEASUREMENT_ID"
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'GA_MEASUREMENT_ID');
          `}
        </Script>
      </head>
      <body>{children}</body>
    </html>
  )
}
\`\`\`

---

## 📚 Additional Resources

### Documentation
- [Next.js Documentation](https://nextjs.org/docs)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [shadcn/ui Documentation](https://ui.shadcn.com)

### Community
- [Next.js GitHub](https://github.com/vercel/next.js)
- [Tailwind CSS GitHub](https://github.com/tailwindlabs/tailwindcss)
- [React Documentation](https://react.dev)

---

## 🎉 Success!

Your TobixTech platform is now ready for deployment! The platform includes:

✅ **Complete Frontend** - Modern, responsive design
✅ **Admin Dashboard** - Secure authentication and management
✅ **Course System** - Interactive learning experience
✅ **Certificate Generation** - Professional certificates
✅ **Security Features** - JWT authentication with device binding
✅ **SEO Optimization** - Search engine friendly
✅ **Mobile Responsive** - Works on all devices
✅ **Production Ready** - Optimized for deployment

For additional support or questions, refer to the documentation or create an issue in the repository.

**Happy coding! 🚀**
