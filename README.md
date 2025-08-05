# TobixTech Learning Platform

A comprehensive educational platform built with Next.js 15, featuring course management, admin authentication, and certificate generation.

## 🚀 Features

### 🎓 **Course Management**
- Interactive course catalog with detailed descriptions
- Progress tracking and completion certificates
- Course reviews and ratings system
- Module-based learning structure

### 🔐 **Admin Dashboard**
- Secure PIN-based authentication with JWT tokens
- Device binding for enhanced security
- Course analytics and user management
- Tutor application review system

### 📱 **Modern UI/UX**
- Responsive design with dark/light mode
- Smooth animations and transitions
- Professional certificate generation
- Mobile-optimized interface

### 🛡️ **Security Features**
- JWT-based authentication
- Device fingerprinting
- Secure API endpoints
- Input validation and sanitization

## 🛠️ Tech Stack

- **Framework**: Next.js 15 with App Router
- **Styling**: Tailwind CSS with shadcn/ui components
- **Authentication**: JWT with device binding
- **Database**: MongoDB Atlas (backend)
- **Deployment**: Vercel
- **Language**: TypeScript

## 📦 Installation

1. **Clone the repository**
   \`\`\`bash
   git clone https://github.com/yourusername/tobixtech-platform.git
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

3. **Set up environment variables**
   \`\`\`bash
   cp .env.example .env.local
   \`\`\`
   
   Add your environment variables:
   \`\`\`env
   BACKEND_URL=your_backend_api_url
   JWT_SECRET=your_jwt_secret_key
   \`\`\`

4. **Generate JWT Secret**
   \`\`\`bash
   node -e "console.log(require('crypto').randomBytes(64).toString('hex'))"
   \`\`\`

5. **Run the development server**
   \`\`\`bash
   npm run dev
   # or
   yarn dev
   # or
   pnpm dev
   \`\`\`

6. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## 🌐 Deployment

### Vercel Deployment

1. **Push to GitHub**
   \`\`\`bash
   git add .
   git commit -m "Initial commit"
   git push origin main
   \`\`\`

2. **Deploy to Vercel**
   - Connect your GitHub repository to Vercel
   - Set environment variables in Vercel dashboard
   - Deploy automatically on push

3. **Environment Variables**
   Set these in your Vercel dashboard:
   - `BACKEND_URL`: Your backend API URL
   - `JWT_SECRET`: Your JWT secret key

## 🔧 Configuration

### Backend Setup
The platform requires a Node.js + Express backend with MongoDB. Use the provided backend prompt with Gemini AI to generate the complete backend code.

### Admin Access
- Default admin access requires PIN validation through the backend
- PINs are managed securely through the database
- Device binding ensures secure access

## 📚 Usage

### For Students
1. Browse available courses
2. Enroll in courses of interest
3. Complete modules and track progress
4. Receive certificates upon completion
5. Leave reviews and ratings

### For Admins
1. Access admin dashboard with secure PIN
2. Manage courses and content
3. Review tutor applications
4. Monitor platform analytics
5. Generate reports

### For Tutors
1. Apply through the tutor application form
2. Wait for admin approval
3. Create and manage course content
4. Interact with students

## 🎨 Customization

### Styling
- Modify `app/globals.css` for global styles
- Update `tailwind.config.js` for theme customization
- Use shadcn/ui components for consistent design

### Content
- Update course data in respective page files
- Modify hero sections and landing page content
- Customize certificate templates

### Features
- Add new course types in the courses directory
- Extend admin functionality in the admin pages
- Implement additional authentication methods

## 🔒 Security

### Authentication Flow
1. User enters PIN on admin login page
2. PIN is validated against backend database
3. JWT token is generated with device binding
4. Token is stored securely and used for API calls
5. Automatic token refresh and validation

### Best Practices
- All sensitive data is handled server-side
- Input validation on all forms
- HTTPS enforcement in production
- Regular security updates

## 📊 Analytics

The platform includes built-in analytics for:
- Course completion rates
- User engagement metrics
- Popular courses and content
- Admin dashboard insights

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🆘 Support

For support and questions:
- Create an issue on GitHub
- Contact the development team
- Check the documentation

## 🚀 Roadmap

### Upcoming Features
- [ ] Video streaming integration
- [ ] Live chat support
- [ ] Advanced analytics dashboard
- [ ] Mobile app development
- [ ] Multi-language support
- [ ] Payment integration
- [ ] Advanced certificate customization

### Version History
- **v1.0.0** - Initial release with core features
- **v1.1.0** - Added admin dashboard and security features
- **v1.2.0** - Enhanced UI/UX and certificate generation

## 🙏 Acknowledgments

- Next.js team for the amazing framework
- shadcn/ui for beautiful components
- Vercel for seamless deployment
- The open-source community

---

**Built with ❤️ by the TobixTech Team**
