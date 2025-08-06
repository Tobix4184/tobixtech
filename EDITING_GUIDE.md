# TobixTech Platform - Complete Deployment Guide

## 🚨 **PERSONALIZATION REQUIRED SECTIONS**

Before deploying, you MUST update these sections with YOUR personal information:

---

### 📝 **Section 1: Personal/Business Information**

**File:** `app/layout.tsx` (Lines 10-50)

**REPLACE THESE VALUES:**

\`\`\`typescript
// CHANGE THIS URL to your actual domain
metadataBase: new URL("https://YOUR-DOMAIN.vercel.app"),

// UPDATE THESE METADATA VALUES
title: {
  default: "YOUR-NAME - Professional Web Development & Digital Marketing Training",
  template: "%s | YOUR-BUSINESS-NAME",
},
description: "YOUR CUSTOM DESCRIPTION HERE",

// UPDATE CONTACT INFO
contactPoint: {
  "@type": "ContactPoint",
  telephone: "YOUR-PHONE-NUMBER", // Example: "+1-555-0123"
  contactType: "customer service",
  availableLanguage: ["English"], // Add your languages
},

// UPDATE SOCIAL MEDIA LINKS
sameAs: [
  "https://twitter.com/YOUR-HANDLE", 
  "https://linkedin.com/in/YOUR-PROFILE", 
  "https://github.com/YOUR-USERNAME"
],
\`\`\`

---

### 📝 **Section 2: Homepage Content**

**File:** `app/page.tsx` (Lines 20-80)

**CUSTOMIZE THESE SECTIONS:**

\`\`\`typescript
// UPDATE HERO SECTION (Line 25)
<h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight">
  Master{" "}
  <span className="bg-gradient-to-r from-primary to-blue-600 bg-clip-text text-transparent">
    YOUR MAIN SKILL/SERVICE // Example: "Web Development"
  </span>{" "}
  & YOUR SECONDARY SKILL // Example: "& Digital Marketing"
</h1>

// UPDATE DESCRIPTION (Line 32)
<p className="text-xl text-muted-foreground max-w-2xl">
  YOUR PERSONAL PITCH HERE // Example: "Transform your career with..."
</p>

// UPDATE STATISTICS (Line 50-55)
const stats = [
  { icon: <Users className="h-6 w-6" />, value: "YOUR-STUDENT-COUNT", label: "Students Trained" },
  { icon: <BookOpen className="h-6 w-6" />, value: "YOUR-COURSE-COUNT", label: "Courses Available" },
  { icon: <Trophy className="h-6 w-6" />, value: "YOUR-SUCCESS-RATE", label: "Success Rate" },
  { icon: <Star className="h-6 w-6" />, value: "YOUR-RATING", label: "Student Rating" }
]
\`\`\`

---

### 📝 **Section 3: About Page**

**File:** `app/about/page.tsx` (Lines 10-50)

**UPDATE YOUR PERSONAL STORY:**

\`\`\`typescript
// ADD YOUR PHOTO (Line 15)
<Image
  src="/YOUR-PHOTO.jpg" // Upload your photo to /public/
  alt="Your Name"
  width={400}
  height={400}
  className="rounded-2xl shadow-xl"
/>

// WRITE YOUR BIO (Line 25)
<h1 className="text-4xl font-bold mb-6">About YOUR-NAME</h1>
<div className="prose prose-lg max-w-none">
  <p>YOUR PERSONAL STORY HERE...</p>
  <p>YOUR EXPERIENCE AND BACKGROUND...</p>
  <p>YOUR MISSION AND GOALS...</p>
</div>

// UPDATE SKILLS SECTION (Line 40)
const skills = [
  { name: "YOUR-SKILL-1", level: 95 },
  { name: "YOUR-SKILL-2", level: 90 },
  { name: "YOUR-SKILL-3", level: 85 },
  // Add more skills
]
\`\`\`

---

### 📝 **Section 4: Contact Information**

**File:** `app/contact/page.tsx` (Lines 15-30)

**UPDATE CONTACT DETAILS:**

\`\`\`typescript
// UPDATE CONTACT INFO (Line 20)
const contactInfo = [
  {
    icon: <Mail className="h-6 w-6" />,
    title: "Email",
    value: "YOUR-EMAIL@domain.com", // Your actual email
    href: "mailto:YOUR-EMAIL@domain.com"
  },
  {
    icon: <Phone className="h-6 w-6" />,
    title: "Phone",
    value: "YOUR-PHONE-NUMBER", // Your actual phone
    href: "tel:YOUR-PHONE-NUMBER"
  },
  {
    icon: <MapPin className="h-6 w-6" />,
    title: "Location",
    value: "YOUR-CITY, YOUR-COUNTRY", // Your location
    href: "#"
  }
]
\`\`\`

---

### 📝 **Section 5: Course Content**

**File:** `data/courses.json` (Entire File)

**REPLACE WITH YOUR COURSES:**

\`\`\`json
[
  {
    "id": "your-course-1",
    "title": "Your Course Title",
    "description": "Your course description",
    "instructor": "YOUR NAME",
    "duration": "X weeks",
    "level": "Beginner/Intermediate/Advanced",
    "price": "YOUR-PRICE",
    "image": "/your-course-image.jpg",
    "skills": ["Skill 1", "Skill 2", "Skill 3"],
    "syllabus": [
      {
        "module": "Module 1",
        "title": "Your Module Title",
        "duration": "X hours",
        "topics": ["Topic 1", "Topic 2"]
      }
    ]
  }
]
\`\`\`

---

### 📝 **Section 6: Footer Links**

**File:** `components/footer.tsx` (Lines 20-40)

**UPDATE FOOTER INFORMATION:**

\`\`\`typescript
// UPDATE COMPANY INFO (Line 25)
<div>
  <h3 className="font-semibold mb-4">YOUR-COMPANY-NAME</h3>
  <p className="text-sm text-muted-foreground">
    YOUR COMPANY DESCRIPTION OR TAGLINE
  </p>
</div>

// UPDATE SOCIAL LINKS (Line 35)
const socialLinks = [
  { icon: <Twitter className="h-5 w-5" />, href: "https://twitter.com/YOUR-HANDLE" },
  { icon: <Linkedin className="h-5 w-5" />, href: "https://linkedin.com/in/YOUR-PROFILE" },
  { icon: <Github className="h-5 w-5" />, href: "https://github.com/YOUR-USERNAME" },
  { icon: <Youtube className="h-5 w-5" />, href: "https://youtube.com/@YOUR-CHANNEL" }
]
\`\`\`

---

### 📝 **Section 7: Navigation Menu**

**File:** `components/navigation.tsx` (Lines 15-25)

**CUSTOMIZE NAVIGATION:**

\`\`\`typescript
// UPDATE LOGO (Line 20)
<Link href="/" className="flex items-center space-x-2">
  <Image
    src="/your-logo.png" // Upload your logo to /public/
    alt="Your Brand"
    width={32}
    height={32}
  />
  <span className="font-bold text-xl">YOUR-BRAND-NAME</span>
</Link>
\`\`\`

---

### 📝 **Section 8: Images and Assets**

**UPLOAD THESE FILES TO `/public/` FOLDER:**

1. **your-logo.png** - Your brand logo (32x32px minimum)
2. **your-photo.jpg** - Your professional headshot (400x400px)
3. **hero-image.jpg** - Main hero section image (1200x800px)
4. **course-images/** - Individual course thumbnails (600x400px each)

**REPLACE PLACEHOLDER IMAGES:**
- Find all instances of `/placeholder.jpg` in your code
- Replace with your actual image paths
- Update alt text to describe your images

---

### 📝 **Section 9: Environment Variables**

**CREATE `.env.local` FILE:**

\`\`\`env
# Your Backend API URL (will be provided after backend deployment)
BACKEND_URL=https://your-backend-name.fly.dev

# Generate this using: node -e "console.log(require('crypto').randomBytes(64).toString('hex'))"
JWT_SECRET=your-generated-jwt-secret-64-characters-long

# Optional: Analytics and tracking
NEXT_PUBLIC_GA_ID=your-google-analytics-id
NEXT_PUBLIC_FACEBOOK_PIXEL_ID=your-facebook-pixel-id
\`\`\`

---

### 📝 **Section 10: SEO and Metadata**

**File:** `app/layout.tsx` (Lines 8-20)

**UPDATE SEO INFORMATION:**

\`\`\`typescript
// UPDATE VERIFICATION CODES (Line 15)
verification: {
  google: "your-google-search-console-code",
  yandex: "your-yandex-verification-code", 
  yahoo: "your-yahoo-verification-code",
},

// UPDATE CANONICAL URL (Line 20)
alternates: {
  canonical: "https://YOUR-ACTUAL-DOMAIN.com",
  languages: {
    "en-US": "https://YOUR-ACTUAL-DOMAIN.com",
    // Add more languages if needed
  },
},
\`\`\`

---

## 🚀 **DEPLOYMENT CHECKLIST**

After personalizing all sections above:

### **Pre-Deployment**
- [ ] Updated all personal information
- [ ] Uploaded all required images to `/public/`
- [ ] Generated JWT secret
- [ ] Created `.env.local` with your values
- [ ] Tested locally with `npm run dev`

### **Backend Deployment**
- [ ] Used `BACKEND_DEVELOPMENT_PROMPT.md` to generate backend
- [ ] Deployed backend to Fly.io
- [ ] Updated `BACKEND_URL` in environment variables
- [ ] Tested backend endpoints

### **Frontend Deployment**
- [ ] Pushed code to GitHub
- [ ] Connected Vercel to GitHub repository
- [ ] Set environment variables in Vercel
- [ ] Deployed to Vercel
- [ ] Verified all pages load correctly

### **Post-Deployment Testing**
- [ ] Homepage loads with your personal content
- [ ] All navigation links work
- [ ] Contact form sends to your email
- [ ] Course pages display your courses
- [ ] Admin login works (if implemented)
- [ ] Site is mobile-responsive
- [ ] SEO metadata is correct

---

## 🆘 **COMMON ISSUES & SOLUTIONS**

### **Issue: Images not loading**
**Solution:** 
1. Ensure images are in `/public/` folder
2. Use correct paths (start with `/` not `./`)
3. Check file names match exactly (case-sensitive)

### **Issue: Environment variables not working**
**Solution:**
1. Check `.env.local` exists in root directory
2. Restart development server after adding variables
3. In Vercel, check environment variables are set

### **Issue: Build fails on deployment**
**Solution:**
1. Run `npm run build` locally first
2. Fix any TypeScript errors
3. Ensure all imports are correct

### **Issue: 404 errors on deployed site**
**Solution:**
1. Check file names match routes
2. Ensure all required files are pushed to GitHub
3. Verify Next.js routing structure

---

## ✅ **FINAL VERIFICATION**

Your site is ready when:

1. **✅ Personal branding** - Logo, colors, and content reflect your brand
2. **✅ Contact info** - All contact methods work and go to you
3. **✅ Course content** - Displays your actual courses and pricing
4. **✅ Social links** - All social media links point to your profiles
5. **✅ Images** - All placeholder images replaced with your content
6. **✅ SEO** - Meta tags, titles, and descriptions are personalized
7. **✅ Functionality** - All features work without errors
8. **✅ Mobile** - Site looks great on all devices

---

## 🎯 **SUCCESS!**

Once you've completed all personalization sections above, your TobixTech platform will be:
- ✅ Fully customized with your branding
- ✅ Ready for professional use
- ✅ Optimized for search engines
- ✅ Mobile-responsive
- ✅ Production-ready

**Your professional educational platform is now live! 🎉**

---

**Need Help?** If you encounter any issues:
1. Check this guide for the specific section
2. Verify you've updated all required fields
3. Test locally before deploying
4. Use browser developer tools to debug issues

**Happy teaching! 📚🚀**

---

# TobixTech Platform Editing Guide

This guide provides comprehensive instructions for editing and maintaining the TobixTech educational platform.

## 🚀 Quick Start

### Prerequisites
- Node.js 18+
- Backend service running (see BACKEND_DEVELOPMENT_PROMPT.md)
- Environment variables configured

### Development Setup
1. Clone and install dependencies
2. Set up environment variables
3. Start backend service
4. Run `npm run dev`

## 📁 Project Structure Overview

\`\`\`
tobixtech-platform/
├── app/                     # Next.js App Router
├── components/              # Reusable components
├── hooks/                   # Custom React hooks
├── lib/                     # Utility functions
├── data/                    # Static data files
├── public/                  # Static assets
└── middleware.ts            # Authentication middleware
\`\`\`

## 🎯 Common Editing Tasks

### 1. Adding New Courses

**Step 1: Backend Data**
Add course data to your backend database following the schema in `BACKEND_DEVELOPMENT_PROMPT.md`.

**Step 2: Course Page (Optional)**
Create a dedicated course page:
\`\`\`bash
# Create new course page
mkdir app/courses/[new-course-id]
touch app/courses/[new-course-id]/page.tsx
\`\`\`

**Step 3: Course Content Page**
Create course content page:
\`\`\`bash
mkdir app/courses/[new-course-id]/content
touch app/courses/[new-course-id]/content/page.tsx
\`\`\`

### 2. Modifying Navigation

Edit `components/navigation.tsx`:
\`\`\`typescript
const navigation = [
  { name: "Home", href: "/" },
  { name: "About", href: "/about" },
  { name: "Courses", href: "/courses" },
  // Add new navigation items here
  { name: "New Page", href: "/new-page" },
]
\`\`\`

### 3. Updating Homepage Content

Edit `app/page.tsx`:
- Hero section content
- Features section
- Call-to-action sections

### 4. Adding New Blog Posts

Blog posts are managed through the backend API and admin dashboard. Use the admin panel at `/admin-dashboard` to create new posts.

### 5. Customizing Themes

**Colors**: Edit `tailwind.config.js` and `app/globals.css`
**Components**: Modify components in `components/ui/`

## 🔧 Component Editing

### UI Components
All UI components are in `components/ui/` and follow shadcn/ui patterns:
- `Button`, `Card`, `Dialog`, etc.
- Fully customizable with Tailwind CSS
- TypeScript support included

### Custom Components
- `Navigation`: Main navigation bar
- `Footer`: Site footer
- `CourseCard`: Course display component
- `CertificateGenerator`: Certificate creation
- `ThemeToggle`: Dark/light mode switcher

## 🎨 Styling Guide

### Tailwind CSS Classes
\`\`\`css
/* Primary colors */
bg-primary text-primary-foreground

/* Secondary colors */
bg-secondary text-secondary-foreground

/* Muted colors */
bg-muted text-muted-foreground

/* Destructive colors */
bg-destructive text-destructive-foreground
\`\`\`

### Dark Mode Support
All components support dark mode automatically through CSS variables defined in `app/globals.css`.

## 🔐 Authentication System

### Admin Authentication
- Login: `/admin-login`
- Dashboard: `/admin-dashboard`
- Protected routes use JWT middleware

### PIN System
- Course access controlled by PINs
- PINs managed through admin dashboard
- Validation handled by backend API

## 📊 Data Management

### Static Data
Located in `data/` directory:
- `courses.json`: Course information
- `blog-posts.json`: Blog post data
- `users.json`: User data
- `pins.json`: PIN data

### Dynamic Data
Managed through backend API:
- User management
- Course content
- Blog posts
- PIN generation

## 🛠️ API Integration

### Frontend API Routes
Located in `app/api/`:
- `/api/admin/*`: Admin operations
- `/api/course-reviews`: Course reviews
- `/api/tutor-application`: Tutor applications
- `/api/validate-pin`: PIN validation

### Backend Integration
All API routes proxy to backend service:
\`\`\`typescript
const backendUrl = process.env.BACKEND_URL || "http://localhost:5000"
\`\`\`

## 🎯 Feature Customization

### Certificate Generation
Edit `components/certificate-generator.tsx`:
- Certificate design
- Student information display
- Download functionality

### Course Reviews
Edit `components/course-reviews.tsx`:
- Review display format
- Rating system
- Submission form

### Language Switching
Edit `components/language-switcher.tsx`:
- Supported languages
- Translation logic
- UI elements

## 📱 Responsive Design

### Breakpoints
\`\`\`css
sm: 640px   /* Small devices */
md: 768px   /* Medium devices */
lg: 1024px  /* Large devices */
xl: 1280px  /* Extra large devices */
2xl: 1536px /* 2X large devices */
\`\`\`

### Mobile-First Approach
All components are designed mobile-first with progressive enhancement for larger screens.

## 🔍 SEO Optimization

### Metadata
Edit metadata in page components:
\`\`\`typescript
export const metadata: Metadata = {
  title: "Page Title",
  description: "Page description",
  keywords: ["keyword1", "keyword2"],
}
\`\`\`

### Open Graph
Configured in `app/layout.tsx` for social media sharing.

## 🚀 Deployment Guide

### Environment Variables
Required for production:
\`\`\`env
JWT_SECRET=your-production-secret
BACKEND_URL=https://your-backend-url.com
NEXT_PUBLIC_APP_URL=https://your-domain.com
\`\`\`

### Vercel Deployment
1. Connect GitHub repository
2. Set environment variables
3. Deploy automatically on push

### Build Process
\`\`\`bash
npm run build  # Build for production
npm start      # Start production server
\`\`\`

## 🧪 Testing

### Component Testing
\`\`\`bash
npm test                    # Run all tests
npm run test:watch         # Watch mode
npm run test:coverage      # Coverage report
\`\`\`

### Manual Testing Checklist
- [ ] All pages load correctly
- [ ] Navigation works on all devices
- [ ] Forms submit successfully
- [ ] Authentication flows work
- [ ] Course access with PINs
- [ ] Admin dashboard functionality
- [ ] Dark/light mode switching
- [ ] Mobile responsiveness

## 🔧 Troubleshooting

### Common Issues

**Build Errors**
- Check TypeScript errors
- Verify all imports
- Ensure environment variables are set

**API Connection Issues**
- Verify backend is running
- Check CORS configuration
- Validate environment variables

**Authentication Problems**
- Ensure JWT_SECRET matches backend
- Check token expiration
- Verify middleware configuration

**Styling Issues**
- Clear browser cache
- Check Tailwind CSS compilation
- Verify CSS custom properties

### Debug Mode
Enable debug logging:
\`\`\`typescript
console.log('Debug info:', data)
\`\`\`

## 📚 Best Practices

### Code Organization
- Keep components small and focused
- Use TypeScript for type safety
- Follow Next.js conventions
- Implement proper error handling

### Performance
- Use Next.js Image component
- Implement proper caching
- Minimize bundle size
- Optimize Core Web Vitals

### Security
- Validate all inputs
- Use environment variables for secrets
- Implement proper authentication
- Follow OWASP guidelines

### Accessibility
- Use semantic HTML
- Implement proper ARIA labels
- Ensure keyboard navigation
- Test with screen readers

## 🔄 Version Control

### Git Workflow
\`\`\`bash
git checkout -b feature/new-feature
git add .
git commit -m "Add new feature"
git push origin feature/new-feature
\`\`\`

### Branch Strategy
- `main`: Production-ready code
- `develop`: Development branch
- `feature/*`: Feature branches
- `hotfix/*`: Emergency fixes

## 📞 Support

### Getting Help
- Check this guide first
- Review component documentation
- Check GitHub issues
- Contact development team

### Reporting Issues
Include:
- Steps to reproduce
- Expected behavior
- Actual behavior
- Browser/device information
- Screenshots if applicable

---

**Happy Editing! 🎉**

This guide covers the most common editing scenarios. For specific technical questions, refer to the component documentation or reach out to the development team.
