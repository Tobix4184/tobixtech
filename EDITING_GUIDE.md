# TobixTech Platform - Complete Editing & Deployment Guide

## 🚀 Quick Start Deployment

### Prerequisites
- Node.js 18+ installed
- Git repository connected to Vercel
- Backend deployed (see Backend section)

### 1. Environment Variables Setup

**In Vercel Dashboard:**
1. Go to your project settings
2. Navigate to "Environment Variables"
3. Add these variables:

\`\`\`env
NEXT_PUBLIC_API_URL=https://your-backend-url.fly.dev
JWT_SECRET=your-super-secure-jwt-secret-key-minimum-32-characters
SEED_ADMIN_PIN1=123456
SEED_ADMIN_PIN2=789012
\`\`\`

**Generate JWT Secret:**
\`\`\`bash
# Option 1: Using Node.js
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"

# Option 2: Using OpenSSL
openssl rand -hex 32

# Option 3: Online generator
# Visit: https://generate-secret.vercel.app/32
\`\`\`

### 2. Deploy to Vercel

**Method 1: Automatic (Recommended)**
1. Push code to your GitHub repository
2. Vercel will automatically deploy
3. Check deployment status in Vercel dashboard

**Method 2: Manual**
\`\`\`bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel --prod
\`\`\`

### 3. Verify Deployment
1. Visit your deployed URL
2. Test admin login at `/admin-login`
3. Use the PINs you set in environment variables
4. Verify all pages load correctly

---

## 🎨 Customization Guide

### Theme & Branding

**1. Colors (app/globals.css)**
\`\`\`css
:root {
  --primary: 221.2 83.2% 53.3%;        /* Main brand color */
  --secondary: 210 40% 96%;            /* Secondary color */
  --accent: 210 40% 96%;               /* Accent color */
  /* Modify these HSL values to match your brand */
}
\`\`\`

**2. Logo & Branding**
- Replace logo files in `public/` directory
- Update site title in `app/layout.tsx`
- Modify footer content in `components/footer.tsx`

**3. Typography**
\`\`\`css
/* In app/globals.css */
body {
  font-family: "Your-Font", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto;
}
\`\`\`

### Content Management

**1. Course Data (data/courses.json)**
\`\`\`json
{
  "id": "your-course-id",
  "title": "Your Course Title",
  "description": "Course description",
  "instructor": "Instructor Name",
  "duration": "8 weeks",
  "level": "Beginner",
  "price": 299,
  "originalPrice": 399,
  "rating": 4.8,
  "studentsEnrolled": 1250,
  "image": "/course-image.jpg",
  "category": "Web Development",
  "tags": ["React", "Next.js", "TypeScript"]
}
\`\`\`

**2. Blog Posts (data/blog-posts.json)**
\`\`\`json
{
  "id": "post-slug",
  "title": "Blog Post Title",
  "content": "Full blog content in HTML or Markdown",
  "excerpt": "Short description",
  "author": "Author Name",
  "category": "Technology",
  "tags": ["React", "Tutorial"],
  "image": "/blog-image.jpg",
  "publishedAt": "2024-01-15T10:00:00Z"
}
\`\`\`

**3. User Data (data/users.json)**
\`\`\`json
{
  "id": "user-id",
  "name": "User Name",
  "email": "user@example.com",
  "phone": "+1234567890",
  "enrolledCourses": ["course-id-1", "course-id-2"],
  "completedCourses": ["course-id-1"],
  "joinedAt": "2024-01-01T00:00:00Z"
}
\`\`\`

### Component Customization

**1. Navigation (components/navigation.tsx)**
- Add/remove menu items
- Modify mobile menu behavior
- Update navigation styling

**2. Footer (components/footer.tsx)**
- Update contact information
- Modify social media links
- Add/remove footer sections

**3. Course Cards (components/course-card.tsx)**
- Customize card layout
- Modify pricing display
- Update enrollment buttons

---

## 🔧 Advanced Configuration

### API Integration

**1. Backend Connection**
\`\`\`typescript
// lib/api.ts
const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001'

export const apiClient = {
  get: async (endpoint: string) => {
    const response = await fetch(`${API_BASE_URL}${endpoint}`)
    return response.json()
  },
  post: async (endpoint: string, data: any) => {
    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    })
    return response.json()
  }
}
\`\`\`

**2. Authentication Setup**
\`\`\`typescript
// lib/auth.ts
export const adminAuth = {
  login: async (pin1: string, pin2: string) => {
    return apiClient.post('/api/auth/admin-login', { pin1, pin2 })
  },
  verifyToken: async (token: string) => {
    return apiClient.post('/api/auth/verify-token', { token })
  }
}
\`\`\`

### Performance Optimization

**1. Image Optimization**
\`\`\`typescript
// next.config.mjs
/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['your-cdn-domain.com'],
    formats: ['image/webp', 'image/avif'],
  },
  experimental: {
    optimizeCss: true,
  }
}

export default nextConfig
\`\`\`

**2. Bundle Analysis**
\`\`\`bash
# Install bundle analyzer
npm install --save-dev @next/bundle-analyzer

# Add to package.json scripts
"analyze": "ANALYZE=true next build"

# Run analysis
npm run analyze
\`\`\`

### SEO Configuration

**1. Metadata (app/layout.tsx)**
\`\`\`typescript
export const metadata: Metadata = {
  title: 'TobixTech - Learn Technology Skills',
  description: 'Master web development, digital marketing, and more with expert-led courses',
  keywords: 'web development, courses, programming, digital marketing',
  authors: [{ name: 'TobixTech Team' }],
  openGraph: {
    title: 'TobixTech Learning Platform',
    description: 'Expert-led technology courses',
    url: 'https://your-domain.com',
    siteName: 'TobixTech',
    images: ['/og-image.jpg'],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'TobixTech Learning Platform',
    description: 'Expert-led technology courses',
    images: ['/twitter-image.jpg'],
  }
}
\`\`\`

**2. Sitemap Generation**
\`\`\`typescript
// app/sitemap.ts
import { MetadataRoute } from 'next'

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: 'https://your-domain.com',
      lastModified: new Date(),
      changeFrequency: 'yearly',
      priority: 1,
    },
    {
      url: 'https://your-domain.com/courses',
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: 'https://your-domain.com/blog',
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.5,
    },
  ]
}
\`\`\`

---

## 🗄️ Backend Setup Guide

### 1. Backend Development

**Use the comprehensive prompt in `BACKEND_DEVELOPMENT_PROMPT.md`:**
1. Copy the entire prompt
2. Paste it to Gemini AI or Claude
3. Follow the generated backend code
4. Deploy to Fly.io as instructed

**Key Backend Features:**
- Node.js + Express + TypeScript
- MongoDB Atlas database
- JWT authentication with device binding
- Rate limiting and security
- Complete API for all frontend features

### 2. Database Setup (MongoDB Atlas)

**Step-by-step:**
1. Go to [MongoDB Atlas](https://www.mongodb.com/atlas)
2. Create free account
3. Create new cluster (M0 Sandbox - Free)
4. Create database user with read/write permissions
5. Configure network access (0.0.0.0/0 for production)
6. Get connection string
7. Add to backend environment variables

### 3. Backend Deployment (Fly.io)

**Commands:**
\`\`\`bash
# Install Fly CLI
curl -L https://fly.io/install.sh | sh

# Login
fly auth login

# In your backend directory
fly launch

# Set environment variables
fly secrets set MONGODB_URI="your-connection-string"
fly secrets set JWT_SECRET="your-jwt-secret"
fly secrets set FRONTEND_URL="https://your-vercel-app.vercel.app"

# Deploy
fly deploy
\`\`\`

---

## 🔒 Security Configuration

### Admin PIN Management

**1. Change Default PINs**
\`\`\`env
# In Vercel environment variables
SEED_ADMIN_PIN1=your-secure-pin-1
SEED_ADMIN_PIN2=your-secure-pin-2
\`\`\`

**2. PIN Security Features**
- Device binding (PINs work only on registered devices)
- Automatic expiration (4-hour sessions)
- Rate limiting (5 attempts per 15 minutes)
- Audit logging

### Environment Security

**1. Production Environment Variables**
\`\`\`env
# Never commit these to Git
NEXT_PUBLIC_API_URL=https://your-backend.fly.dev
JWT_SECRET=32-character-minimum-secret
SEED_ADMIN_PIN1=6-digit-secure-pin
SEED_ADMIN_PIN2=6-digit-secure-pin
\`\`\`

**2. Security Headers**
\`\`\`typescript
// next.config.mjs
const nextConfig = {
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'X-Frame-Options',
            value: 'DENY',
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
          {
            key: 'Referrer-Policy',
            value: 'origin-when-cross-origin',
          },
        ],
      },
    ]
  },
}
\`\`\`

---

## 🧪 Testing & Quality Assurance

### Pre-Deployment Checklist

**1. Functionality Tests**
- [ ] All pages load correctly
- [ ] Navigation works on mobile and desktop
- [ ] Admin login with correct PINs
- [ ] Course pages display properly
- [ ] Blog posts load and display
- [ ] Contact form submissions
- [ ] Theme switching (dark/light)
- [ ] Certificate generation

**2. Performance Tests**
- [ ] Lighthouse score 90+ on all metrics
- [ ] Images load quickly and are optimized
- [ ] No console errors
- [ ] Fast page transitions
- [ ] Mobile performance acceptable

**3. Security Tests**
- [ ] Admin areas require authentication
- [ ] Invalid PINs are rejected
- [ ] Rate limiting works
- [ ] No sensitive data in client-side code
- [ ] HTTPS enforced

### Testing Commands

\`\`\`bash
# Build test
npm run build

# Lint check
npm run lint

# Type checking
npx tsc --noEmit

# Performance audit
npx lighthouse https://your-domain.com --view
\`\`\`

---

## 🚨 Troubleshooting

### Common Deployment Issues

**1. Build Errors**
\`\`\`bash
# Clear Next.js cache
rm -rf .next

# Clear node modules
rm -rf node_modules package-lock.json
npm install

# Rebuild
npm run build
\`\`\`

**2. Environment Variable Issues**
- Ensure all required variables are set in Vercel
- Check variable names match exactly
- Restart deployment after adding variables

**3. API Connection Issues**
- Verify backend is deployed and running
- Check CORS configuration in backend
- Ensure API URL is correct in environment variables

**4. Admin Login Issues**
- Verify PINs match environment variables
- Check JWT secret is set correctly
- Ensure backend authentication endpoints work

### Performance Issues

**1. Slow Loading**
- Optimize images (use WebP format)
- Enable Next.js image optimization
- Implement lazy loading
- Minimize bundle size

**2. Memory Issues**
- Check for memory leaks in components
- Optimize large data structures
- Use React.memo for expensive components

### Security Issues

**1. Authentication Problems**
- Verify JWT secret consistency
- Check token expiration settings
- Ensure device fingerprinting works

**2. CORS Issues**
- Configure backend CORS properly
- Ensure frontend domain is whitelisted
- Check preflight request handling

---

## 📊 Monitoring & Analytics

### Performance Monitoring

**1. Vercel Analytics**
- Enable in Vercel dashboard
- Monitor Core Web Vitals
- Track page performance

**2. Custom Analytics**
\`\`\`typescript
// lib/analytics.ts
export const trackEvent = (eventName: string, properties?: any) => {
  if (typeof window !== 'undefined') {
    // Google Analytics 4
    gtag('event', eventName, properties)
    
    // Custom analytics
    fetch('/api/analytics/track', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ event: eventName, properties })
    })
  }
}
\`\`\`

### Error Monitoring

**1. Error Boundary**
\`\`\`typescript
// components/error-boundary.tsx
'use client'

import { Component, ReactNode } from 'react'

interface Props {
  children: ReactNode
}

interface State {
  hasError: boolean
}

export class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props)
    this.state = { hasError: false }
  }

  static getDerivedStateFromError(): State {
    return { hasError: true }
  }

  componentDidCatch(error: Error, errorInfo: any) {
    console.error('Error caught by boundary:', error, errorInfo)
    // Send to error reporting service
  }

  render() {
    if (this.state.hasError) {
      return <div>Something went wrong. Please refresh the page.</div>
    }

    return this.props.children
  }
}
\`\`\`

---

## 🔄 Maintenance & Updates

### Regular Maintenance Tasks

**1. Weekly**
- Check deployment status
- Review error logs
- Monitor performance metrics
- Update content as needed

**2. Monthly**
- Update dependencies
- Security audit
- Performance optimization
- Backup data

**3. Quarterly**
- Major feature updates
- Security review
- Performance analysis
- User feedback integration

### Update Process

**1. Dependency Updates**
\`\`\`bash
# Check outdated packages
npm outdated

# Update packages
npm update

# Test after updates
npm run build
npm run lint
\`\`\`

**2. Security Updates**
\`\`\`bash
# Audit dependencies
npm audit

# Fix vulnerabilities
npm audit fix

# Manual fixes if needed
npm audit fix --force
\`\`\`

---

## 📞 Support & Resources

### Documentation
- [Next.js Documentation](https://nextjs.org/docs)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [shadcn/ui Documentation](https://ui.shadcn.com)
- [Vercel Documentation](https://vercel.com/docs)

### Community Support
- [Next.js GitHub Discussions](https://github.com/vercel/next.js/discussions)
- [Tailwind CSS Discord](https://tailwindcss.com/discord)
- [Vercel Community](https://vercel.com/community)

### Professional Support
- Create GitHub issues for bugs
- Contact: support@tobixtech.com
- Documentation updates: docs@tobixtech.com

---

## ✅ Final Deployment Checklist

### Pre-Launch
- [ ] All environment variables configured
- [ ] Backend deployed and tested
- [ ] Database connected and seeded
- [ ] Admin authentication working
- [ ] All pages loading correctly
- [ ] Mobile responsiveness verified
- [ ] Performance optimized (Lighthouse 90+)
- [ ] SEO metadata configured
- [ ] Error handling implemented
- [ ] Security measures in place

### Post-Launch
- [ ] Monitor deployment status
- [ ] Test all functionality
- [ ] Check analytics setup
- [ ] Verify admin access
- [ ] Monitor error logs
- [ ] Performance monitoring active
- [ ] Backup systems in place
- [ ] Documentation updated

---

**🎉 Congratulations! Your TobixTech platform is now live and ready for users!**

For any issues or questions, refer to this guide or contact support. Keep this document updated as you make changes to the platform.
