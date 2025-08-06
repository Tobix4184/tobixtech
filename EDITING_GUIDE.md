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
\`\`\`

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
