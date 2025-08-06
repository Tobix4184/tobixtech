# TobixTech Platform 🚀

> Professional Educational Platform for Web Development & Digital Marketing Training

[![Next.js](https://img.shields.io/badge/Next.js-15.0.3-black?style=for-the-badge&logo=next.js)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.3.3-blue?style=for-the-badge&logo=typescript)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3.4.17-38B2AC?style=for-the-badge&logo=tailwind-css)](https://tailwindcss.com/)
[![Vercel](https://img.shields.io/badge/Vercel-Production-black?style=for-the-badge&logo=vercel)](https://vercel.com/)

## ✨ Features

- 🎨 **Modern UI/UX** - Built with Tailwind CSS and shadcn/ui components
- 📱 **Fully Responsive** - Optimized for all devices and screen sizes  
- 🌙 **Dark/Light Mode** - Seamless theme switching
- 🔒 **Secure Admin Panel** - Two-step PIN authentication system
- 📚 **Course Management** - PIN-based course access with device binding
- 🏆 **Certificate Generation** - Automated PDF certificates upon completion
- 📊 **Admin Dashboard** - Complete content management system
- 🔍 **SEO Optimized** - Built-in SEO best practices and structured data
- ⚡ **Performance First** - Optimized for Core Web Vitals
- 🛡️ **Type Safe** - Full TypeScript implementation

## 🚀 Quick Start

### Prerequisites

- Node.js 18+ 
- npm or yarn
- Git

### Installation

1. **Clone the repository:**
   \`\`\`bash
   git clone https://github.com/yourusername/tobixtech-platform.git
   cd tobixtech-platform
   \`\`\`

2. **Install dependencies:**
   \`\`\`bash
   npm install
   \`\`\`

3. **Set up environment variables:**
   \`\`\`bash
   cp .env.example .env.local
   \`\`\`
   
   Add your environment variables:
   \`\`\`env
   BACKEND_URL=http://localhost:5000
   JWT_SECRET=your-generated-jwt-secret
   \`\`\`

4. **Run the development server:**
   \`\`\`bash
   npm run dev
   \`\`\`

5. **Open your browser:**
   Navigate to [http://localhost:3000](http://localhost:3000)

## 📁 Project Structure

\`\`\`
tobixtech-platform/
├── app/                          # Next.js App Router
│   ├── (routes)/                 # Route groups
│   │   ├── about/               # About page
│   │   ├── courses/             # Course pages
│   │   ├── contact/             # Contact page
│   │   └── blog/                # Blog system
│   ├── admin-dashboard/         # Admin panel
│   ├── admin-login/             # Admin authentication
│   ├── api/                     # API routes
│   ├── globals.css              # Global styles
│   └── layout.tsx               # Root layout
├── components/                   # Reusable components
│   ├── ui/                      # shadcn/ui components
│   ├── navigation.tsx           # Main navigation
│   ├── footer.tsx               # Site footer
│   └── theme-provider.tsx       # Theme management
├── data/                        # Static data files
│   ├── courses.json             # Course information
│   ├── blog-posts.json          # Blog content
│   └── users.json               # User data
├── lib/                         # Utility functions
├── hooks/                       # Custom React hooks
└── public/                      # Static assets
\`\`\`

## 🔧 Key Components

### Course Management System
- **PIN-based Access**: Secure 5-digit PIN system for course enrollment
- **Device Binding**: Each PIN works on only one device for security
- **Progress Tracking**: Module completion and progress monitoring
- **Certificate Generation**: Automated PDF certificates upon course completion

### Admin Dashboard
- **Two-Step Authentication**: Dual PIN security system
- **Content Management**: Full CRUD operations for courses, users, and content
- **Analytics**: Student progress and platform statistics
- **PIN Management**: Generate and manage course access PINs

### Modern Tech Stack
- **Next.js 15**: Latest App Router with server components
- **TypeScript**: Full type safety and better developer experience
- **Tailwind CSS**: Utility-first CSS framework
- **shadcn/ui**: High-quality, accessible component library
- **Lucide Icons**: Beautiful, customizable icons

## 🎨 Customization

### Theming
The platform supports both light and dark themes with CSS custom properties:

\`\`\`css
:root {
  --primary: 221.2 83.2% 53.3%;
  --secondary: 210 40% 96%;
  --background: 0 0% 100%;
  /* ... more variables */
}
\`\`\`

### Component Customization
All components are built with Tailwind CSS and can be easily customized:

\`\`\`tsx
// Example: Customizing a button
<Button 
  variant="default" 
  size="lg" 
  className="bg-gradient-to-r from-blue-500 to-purple-600"
>
  Custom Button
</Button>
\`\`\`

## 📊 Performance

The platform is optimized for maximum performance:

- ⚡ **Lighthouse Score**: 95+ across all metrics
- 🚀 **Core Web Vitals**: All green scores
- 📱 **Mobile First**: Responsive design principles
- 🖼️ **Image Optimization**: Next.js automatic image optimization
- 📦 **Bundle Size**: Optimized with tree shaking and code splitting

## 🔒 Security Features

- **Two-Step Admin Authentication**: Dual PIN security system
- **JWT Token Management**: Secure session handling
- **Device Binding**: Prevent PIN sharing across devices
- **Rate Limiting**: Protection against brute force attacks
- **Input Validation**: Server-side validation for all inputs
- **CORS Protection**: Proper cross-origin request handling

## 🌐 Deployment

### Vercel (Recommended)

1. **Push to GitHub:**
   \`\`\`bash
   git add .
   git commit -m "Initial commit"
   git push origin main
   \`\`\`

2. **Deploy to Vercel:**
   - Connect your GitHub repository
   - Set environment variables
   - Deploy automatically

3. **Environment Variables:**
   \`\`\`env
   BACKEND_URL=https://your-backend.fly.dev
   JWT_SECRET=your-generated-jwt-secret
   \`\`\`

### Manual Deployment

1. **Build the project:**
   \`\`\`bash
   npm run build
   \`\`\`

2. **Start production server:**
   \`\`\`bash
   npm start
   \`\`\`

## 🧪 Testing

\`\`\`bash
# Run type checking
npm run type-check

# Run linting
npm run lint

# Build test
npm run build
\`\`\`

## 📚 Documentation

- **[Deployment Guide](./EDITING_GUIDE.md)** - Complete deployment instructions
- **[Backend Setup](./BACKEND_DEVELOPMENT_PROMPT.md)** - Backend development guide
- **[Component Documentation](./components/)** - Individual component docs
- **[API Documentation](./app/api/)** - API endpoints documentation

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- [Next.js](https://nextjs.org/) for the amazing React framework
- [Tailwind CSS](https://tailwindcss.com/) for the utility-first CSS framework
- [shadcn/ui](https://ui.shadcn.com/) for the beautiful component library
- [Lucide](https://lucide.dev/) for the icon set
- [Vercel](https://vercel.com/) for hosting and deployment

## 📞 Support

- **Email**: support@tobixtech.com
- **Documentation**: [Full Documentation](./docs/)
- **Issues**: [GitHub Issues](https://github.com/yourusername/tobixtech-platform/issues)

---

**Built with ❤️ by the TobixTech Team**

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/yourusername/tobixtech-platform)
