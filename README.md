# TobixTech - Professional Learning Platform

A comprehensive educational platform built with Next.js 15, featuring course management, admin dashboard, secure PIN-based access, and certificate generation.

## 🚀 Features

### 🎓 **Course Management**
- Interactive course content with modules and lessons
- Progress tracking and completion certificates
- Course reviews and ratings
- Multiple course formats (video, text, interactive)

### 🔐 **Security System**
- **Two-PIN Admin Authentication** - Dual-layer security
- **JWT Token Management** - Secure session handling
- **Device-Bound PINs** - Prevents sharing/piracy
- **Rate Limiting** - Brute force protection

### 📊 **Admin Dashboard**
- User management and analytics
- Course content management
- PIN generation and distribution
- Blog post management
- Real-time statistics

### 🎨 **Modern UI/UX**
- Responsive design with Tailwind CSS
- Dark/Light theme support
- Smooth animations and transitions
- Mobile-first approach

### 📱 **Additional Features**
- Multi-language support
- Certificate generation
- Contact forms and tutor applications
- Blog system
- SEO optimized

## 🛠️ Tech Stack

- **Framework**: Next.js 15 (App Router)
- **Styling**: Tailwind CSS + shadcn/ui
- **Authentication**: JWT + Custom PIN system
- **Database**: MongoDB Atlas (via backend API)
- **Deployment**: Vercel (Frontend) + Fly.io (Backend)
- **Language**: TypeScript

## 📦 Installation

1. **Clone the repository**
   \`\`\`bash
   git clone https://github.com/yourusername/tobixtech.git
   cd tobixtech
   \`\`\`

2. **Install dependencies**
   \`\`\`bash
   npm install
   \`\`\`

3. **Set up environment variables**
   \`\`\`bash
   cp .env.example .env.local
   \`\`\`
   
   Add your environment variables:
   \`\`\`env
   BACKEND_URL=https://your-backend-url.fly.dev
   JWT_SECRET=your-64-character-hex-string
   \`\`\`

4. **Generate JWT Secret**
   \`\`\`bash
   node -e "console.log(require('crypto').randomBytes(64).toString('hex'))"
   \`\`\`

5. **Run development server**
   \`\`\`bash
   npm run dev
   \`\`\`

## 🚀 Deployment

### Frontend (Vercel)
1. Connect your GitHub repository to Vercel
2. Set environment variables in Vercel dashboard
3. Deploy automatically on push to main

### Backend (Fly.io)
1. Use the provided `BACKEND_DEVELOPMENT_PROMPT.md` with Gemini AI
2. Deploy the generated backend to Fly.io
3. Update `BACKEND_URL` in Vercel environment variables

## 🔧 Configuration

### Environment Variables

| Variable | Description | Required |
|----------|-------------|----------|
| `BACKEND_URL` | Your backend API URL | ✅ |
| `JWT_SECRET` | Secret for JWT token signing | ✅ |

### Admin Access
1. Navigate to `/admin-login`
2. Enter the two admin PINs (configured in backend)
3. Access admin dashboard at `/admin-dashboard`

### Course PINs
- Generated through admin dashboard
- Device-bound for security
- Configurable expiration dates
- Multiple PINs per course supported

## 📁 Project Structure

\`\`\`
tobixtech/
├── app/                    # Next.js App Router
│   ├── (pages)/           # Page routes
│   ├── api/               # API routes
│   └── globals.css        # Global styles
├── components/            # Reusable components
│   ├── ui/               # shadcn/ui components
│   └── ...               # Custom components
├── lib/                  # Utility functions
├── hooks/                # Custom React hooks
├── data/                 # Static data files
└── public/               # Static assets
\`\`\`

## 🔐 Security Features

### Admin Authentication
- **Two-PIN System**: Requires two separate PINs for admin access
- **JWT Tokens**: Secure session management with 4-hour expiration
- **Rate Limiting**: Prevents brute force attacks
- **Device Binding**: Admin sessions tied to specific devices

### Course Access
- **Device-Bound PINs**: Each PIN permanently locked to first device used
- **Expiration Dates**: Time-limited access control
- **Usage Tracking**: Monitor PIN usage and prevent abuse
- **Multiple PINs**: Generate multiple access codes per course

## 🎨 Customization

### Themes
- Built-in dark/light mode toggle
- Customizable color schemes in `globals.css`
- Responsive design breakpoints

### Content
- Course content managed through admin dashboard
- Blog posts with rich text editing
- Customizable certificate templates

## 📊 Analytics & Monitoring

- User engagement tracking
- Course completion rates
- PIN usage statistics
- Admin activity logs

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
- 📧 Email: support@tobixtech.com
- 📱 WhatsApp: +1234567890
- 🌐 Website: https://tobixtech.com

## 🙏 Acknowledgments

- [Next.js](https://nextjs.org/) - React framework
- [Tailwind CSS](https://tailwindcss.com/) - Utility-first CSS
- [shadcn/ui](https://ui.shadcn.com/) - Component library
- [Vercel](https://vercel.com/) - Deployment platform
- [Fly.io](https://fly.io/) - Backend hosting

---

**Built with ❤️ by TobixTech Team**
