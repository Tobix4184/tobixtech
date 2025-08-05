# TobixTech Platform - Complete Editing & Deployment Guide

## 🚀 Quick Start Deployment

### 1. **Environment Variables Setup**

**Vercel Dashboard → Settings → Environment Variables:**

\`\`\`env
# Required Environment Variables
BACKEND_URL=https://your-fly-app-name.fly.dev
JWT_SECRET=your-64-character-hex-string
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
tobixtech/
├── app/                          # Next.js App Router
│   ├── admin-login/             # Admin authentication
│   ├── admin-dashboard/         # Admin management panel
│   ├── courses/                 # Course pages & content
│   ├── api/                     # API routes
│   │   ├── admin/              # Admin API endpoints
│   │   ├── validate-pin/       # PIN validation
│   │   └── courses/            # Course content API
│   └── globals.css             # Global styles with Tailwind
├── components/                  # Reusable components
│   ├── ui/                     # shadcn/ui components
│   ├── certificate-generator.tsx
│   ├── navigation.tsx
│   └── theme-toggle.tsx
├── data/                       # Static data files
│   ├── courses.json
│   ├── users.json
│   ├── pins.json
│   └── blog-posts.json
└── middleware.ts               # Route protection
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

### **1. Authentication Security**
- JWT tokens expire in 4 hours
- Secure HTTP-only cookies (if implemented)
- Rate limiting on auth endpoints

### **2. Data Protection**
- Input validation on all forms
- SQL injection prevention
- XSS protection with proper escaping

### **3. Course Content Security**
- Device-bound PIN system
- Content access logging
- Unauthorized access prevention

---

## 📈 Analytics & Monitoring

### **1. User Analytics**
- Course completion rates
- User engagement metrics
- Popular content tracking

### **2. System Monitoring**
- API response times
- Error rate monitoring
- Uptime tracking

### **3. Business Metrics**
- Revenue tracking
- User acquisition
- Course performance

---

## 🚀 Future Enhancements

### **Planned Features**
- [ ] Mobile app development
- [ ] Advanced analytics dashboard
- [ ] Multi-language course content
- [ ] Live streaming capabilities
- [ ] AI-powered course recommendations
- [ ] Advanced certificate customization
- [ ] Payment gateway integration
- [ ] Social learning features

### **Technical Improvements**
- [ ] GraphQL API implementation
- [ ] Real-time notifications
- [ ] Advanced caching layer
- [ ] Microservices architecture
- [ ] Enhanced security features

---

## 📞 Support & Maintenance

### **Getting Help**
- 📧 **Technical Support**: dev@tobixtech.com
- 📱 **WhatsApp**: +1234567890
- 🌐 **Documentation**: https://docs.tobixtech.com
- 🐛 **Bug Reports**: GitHub Issues

### **Maintenance Schedule**
- **Daily**: Automated backups
- **Weekly**: Security updates
- **Monthly**: Performance optimization
- **Quarterly**: Feature updates

---

## ✅ Pre-Deployment Checklist

### **Environment Setup**
- [ ] JWT_SECRET generated and set
- [ ] BACKEND_URL configured
- [ ] All dependencies installed
- [ ] TypeScript compilation successful

### **Testing**
- [ ] Admin login functionality
- [ ] Course PIN validation
- [ ] Certificate generation
- [ ] Mobile responsiveness
- [ ] Dark/light theme toggle

### **Security**
- [ ] All API endpoints protected
- [ ] Input validation implemented
- [ ] Rate limiting configured
- [ ] Error handling in place

### **Performance**
- [ ] Build optimization complete
- [ ] Images optimized
- [ ] Lighthouse score > 90
- [ ] Core Web Vitals passing

---

**🎉 Your TobixTech platform is now ready for deployment!**

This comprehensive guide covers everything needed to successfully deploy, customize, and maintain your educational platform. Follow the steps carefully, and you'll have a professional, secure, and scalable learning management system.
