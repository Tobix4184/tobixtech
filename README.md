# TobixTech Educational Platform

A comprehensive educational platform built with Next.js 15, featuring course management, user authentication, blog system, and admin dashboard.

## 🚀 Features

- **Modern Tech Stack**: Built with Next.js 15, TypeScript, and Tailwind CSS
- **Course Management**: Complete course system with PIN-based access
- **User Authentication**: Secure JWT-based authentication system
- **Admin Dashboard**: Comprehensive admin panel for content management
- **Blog System**: Full-featured blog with content management
- **Responsive Design**: Mobile-first responsive design
- **Dark Mode**: Built-in dark/light theme support
- **Certificate Generation**: Automated certificate generation for course completion
- **Tutor Applications**: System for managing tutor applications

## 🛠️ Tech Stack

### Frontend
- **Framework**: Next.js 15 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **UI Components**: shadcn/ui
- **Icons**: Lucide React
- **Theme**: next-themes

### Backend Integration
- **API**: RESTful API endpoints
- **Authentication**: JWT tokens
- **Database**: MongoDB (via backend service)
- **File Storage**: Local/Cloud storage support

## 📦 Installation

### Prerequisites
- Node.js 18+ 
- npm/yarn/pnpm
- Backend service running (see BACKEND_DEVELOPMENT_PROMPT.md)

### Frontend Setup

1. **Clone the repository**
   \`\`\`bash
   git clone <repository-url>
   cd tobixtech-platform
   \`\`\`

2. **Install dependencies**
   \`\`\`bash
   npm install
   # or
   yarn install
   # or
   pnpm install
   \`\`\`

3. **Environment Configuration**
   Create a `.env.local` file in the root directory:
   \`\`\`env
   # JWT Secret (must match backend)
   JWT_SECRET=your-super-secure-jwt-secret-key-here
   
   # Backend URL
   BACKEND_URL=http://localhost:5000
   
   # Next.js Configuration
   NEXT_PUBLIC_APP_URL=http://localhost:3000
   \`\`\`

4. **Start the development server**
   \`\`\`bash
   npm run dev
   # or
   yarn dev
   # or
   pnpm dev
   \`\`\`

5. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## 🏗️ Project Structure

\`\`\`
tobixtech-platform/
├── app/                          # Next.js App Router
│   ├── (routes)/                 # Route groups
│   │   ├── about/               # About page
│   │   ├── blog/                # Blog system
│   │   ├── contact/             # Contact page
│   │   ├── courses/             # Course pages
│   │   ├── projects/            # Projects showcase
│   │   └── skills/              # Skills page
│   ├── admin-dashboard/         # Admin panel
│   ├── admin-login/             # Admin authentication
│   ├── api/                     # API routes
│   │   ├── admin/               # Admin API endpoints
│   │   ├── course-reviews/      # Course review API
│   │   ├── tutor-application/   # Tutor application API
│   │   └── validate-pin/        # PIN validation API
│   ├── globals.css              # Global styles
│   ├── layout.tsx               # Root layout
│   └── page.tsx                 # Home page
├── components/                   # Reusable components
│   ├── ui/                      # shadcn/ui components
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
├── hooks/                       # Custom React hooks
├── lib/                         # Utility functions
├── data/                        # Static data files
├── public/                      # Static assets
└── middleware.ts                # Next.js middleware
\`\`\`

## 🔧 Configuration

### Environment Variables

| Variable | Description | Required |
|----------|-------------|----------|
| `JWT_SECRET` | Secret key for JWT token verification | Yes |
| `BACKEND_URL` | URL of the backend API service | Yes |
| `NEXT_PUBLIC_APP_URL` | Public URL of the frontend app | No |

### Backend Integration

This frontend requires a backend service to be running. See `BACKEND_DEVELOPMENT_PROMPT.md` for detailed backend setup instructions.

**Key Integration Points:**
- User authentication and management
- Course content delivery
- PIN validation system
- Blog post management
- Admin dashboard functionality

## 📚 Usage

### For Students
1. **Browse Courses**: View available courses on the courses page
2. **Course Access**: Use provided PINs to access course content
3. **Progress Tracking**: Track your learning progress through modules
4. **Certificates**: Generate certificates upon course completion
5. **Reviews**: Leave reviews and ratings for completed courses

### For Administrators
1. **Admin Login**: Access admin panel at `/admin-login`
2. **User Management**: View and manage registered users
3. **Course Management**: Create, edit, and manage courses
4. **PIN Management**: Generate and manage course access PINs
5. **Blog Management**: Create and publish blog posts
6. **Tutor Applications**: Review and manage tutor applications

### For Tutors
1. **Application**: Apply to become a tutor via `/become-tutor`
2. **Course Creation**: Create courses through the admin system
3. **Student Interaction**: Engage with students through the platform

## 🎨 Customization

### Theming
The platform supports both light and dark themes using `next-themes`. Customize colors in:
- `tailwind.config.js` - Tailwind configuration
- `app/globals.css` - CSS custom properties

### Components
All UI components are built with shadcn/ui and can be customized:
- Modify existing components in `components/ui/`
- Create new components following the established patterns
- Update styling using Tailwind CSS classes

### Content
- **Static Content**: Update content in page components
- **Dynamic Content**: Managed through the backend API
- **Images**: Store in `public/` directory or use external URLs

## 🚀 Deployment

### Vercel (Recommended)
1. **Connect Repository**: Link your GitHub repository to Vercel
2. **Environment Variables**: Set required environment variables in Vercel dashboard
3. **Deploy**: Automatic deployment on every push to main branch

### Manual Deployment
1. **Build the application**
   \`\`\`bash
   npm run build
   \`\`\`

2. **Start production server**
   \`\`\`bash
   npm start
   \`\`\`

### Environment Setup for Production
\`\`\`env
JWT_SECRET=your-production-jwt-secret
BACKEND_URL=https://your-backend-domain.com
NEXT_PUBLIC_APP_URL=https://your-frontend-domain.com
\`\`\`

## 🔒 Security

- **JWT Authentication**: Secure admin routes with JWT tokens
- **Input Validation**: All forms include client-side validation
- **CORS Protection**: Configured for specific origins
- **Environment Variables**: Sensitive data stored in environment variables
- **Middleware Protection**: Admin routes protected by authentication middleware

## 🧪 Testing

### Running Tests
\`\`\`bash
# Run all tests
npm test

# Run tests in watch mode
npm run test:watch

# Run tests with coverage
npm run test:coverage
\`\`\`

### Test Structure
- **Unit Tests**: Component and utility function tests
- **Integration Tests**: API endpoint tests
- **E2E Tests**: Full user journey tests

## 📈 Performance

### Optimization Features
- **Next.js App Router**: Optimized routing and rendering
- **Image Optimization**: Automatic image optimization
- **Code Splitting**: Automatic code splitting for better performance
- **Static Generation**: Static generation where possible
- **Caching**: Proper caching headers and strategies

### Performance Monitoring
- Monitor Core Web Vitals
- Use Next.js built-in analytics
- Implement error tracking

## 🤝 Contributing

1. **Fork the repository**
2. **Create a feature branch**
   \`\`\`bash
   git checkout -b feature/amazing-feature
   \`\`\`
3. **Commit your changes**
   \`\`\`bash
   git commit -m 'Add some amazing feature'
   \`\`\`
4. **Push to the branch**
   \`\`\`bash
   git push origin feature/amazing-feature
   \`\`\`
5. **Open a Pull Request**

### Development Guidelines
- Follow TypeScript best practices
- Use ESLint and Prettier for code formatting
- Write tests for new features
- Update documentation as needed
- Follow the existing code style and patterns

## 📞 Support

### Getting Help
- **Documentation**: Check this README and inline code comments
- **Issues**: Create GitHub issues for bugs and feature requests
- **Discussions**: Use GitHub Discussions for questions and ideas

### Common Issues
1. **Build Errors**: Ensure all environment variables are set
2. **API Connection**: Verify backend service is running
3. **Authentication**: Check JWT secret matches between frontend and backend
4. **CORS Issues**: Verify CORS configuration in backend

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- **Next.js Team**: For the amazing framework
- **Vercel**: For hosting and deployment platform
- **shadcn/ui**: For the beautiful UI components
- **Tailwind CSS**: For the utility-first CSS framework
- **Open Source Community**: For the countless libraries and tools

## 📊 Project Status

- ✅ **Frontend**: Complete and production-ready
- 🔄 **Backend**: Requires setup (see BACKEND_DEVELOPMENT_PROMPT.md)
- ✅ **Authentication**: JWT-based system implemented
- ✅ **Course System**: PIN-based access system
- ✅ **Admin Dashboard**: Full admin functionality
- ✅ **Blog System**: Content management system
- ✅ **Responsive Design**: Mobile-first approach
- ✅ **Dark Mode**: Theme switching support

## 🔮 Future Enhancements

- **Real-time Chat**: Student-tutor communication
- **Video Streaming**: Integrated video player
- **Payment Integration**: Course purchase system
- **Mobile App**: React Native mobile application
- **Advanced Analytics**: Detailed learning analytics
- **AI Integration**: Personalized learning recommendations
- **Multi-language**: Internationalization support
- **Offline Mode**: Progressive Web App features

---

**Built with ❤️ by the TobixTech Team**
