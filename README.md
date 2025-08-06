# TobixTech Learning Platform

A comprehensive educational platform built with Next.js 15, featuring course management, admin dashboard, certificate generation, and modern UI components.

## 🚀 Features

- **Modern UI/UX**: Built with Next.js 15, Tailwind CSS, and shadcn/ui components
- **Course Management**: Complete course catalog with detailed content pages
- **Admin Dashboard**: Secure admin panel with PIN-based authentication
- **Certificate Generation**: Automated certificate creation and download
- **Blog System**: Dynamic blog with post management
- **Theme Support**: Dark/Light mode with smooth transitions
- **Responsive Design**: Mobile-first approach with perfect responsiveness
- **Security**: JWT authentication, device binding, and rate limiting
- **Performance**: Optimized for speed and SEO

## 🛠️ Tech Stack

- **Frontend**: Next.js 15, React 19, TypeScript
- **Styling**: Tailwind CSS, shadcn/ui components
- **Authentication**: JWT tokens, PIN-based admin auth
- **State Management**: React hooks and context
- **Icons**: Lucide React
- **Deployment**: Vercel (Frontend), Fly.io (Backend)

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

   Add the following variables to `.env.local`:
   \`\`\`env
   NEXT_PUBLIC_API_URL=http://localhost:3001
   JWT_SECRET=your-super-secure-jwt-secret-key-here
   SEED_ADMIN_PIN1=123456
   SEED_ADMIN_PIN2=789012
   \`\`\`

4. **Run the development server**
   \`\`\`bash
   npm run dev
   # or
   yarn dev
   # or
   pnpm dev
   \`\`\`

5. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## 🔧 Configuration

### Environment Variables

| Variable | Description | Required |
|----------|-------------|----------|
| `NEXT_PUBLIC_API_URL` | Backend API URL | Yes |
| `JWT_SECRET` | Secret key for JWT tokens | Yes |
| `SEED_ADMIN_PIN1` | First admin PIN | Yes |
| `SEED_ADMIN_PIN2` | Second admin PIN | Yes |

### Admin Access

1. Navigate to `/admin-login`
2. Enter both admin PINs
3. Access the admin dashboard at `/admin-dashboard`

## 📁 Project Structure

\`\`\`
tobixtech-platform/
├── app/                    # Next.js app directory
│   ├── about/             # About page
│   ├── admin-dashboard/   # Admin dashboard
│   ├── admin-login/       # Admin login
│   ├── api/               # API routes
│   ├── blog/              # Blog pages
│   ├── become-tutor/      # Tutor application
│   ├── contact/           # Contact page
│   ├── courses/           # Course pages
│   ├── projects/          # Projects page
│   ├── skills/            # Skills page
│   ├── globals.css        # Global styles
│   ├── layout.tsx         # Root layout
│   └── page.tsx           # Home page
├── components/            # Reusable components
│   ├── ui/               # shadcn/ui components
│   ├── certificate-generator.tsx
│   ├── course-card.tsx
│   ├── footer.tsx
│   ├── navigation.tsx
│   └── theme-toggle.tsx
├── data/                 # Static data files
├── hooks/                # Custom React hooks
├── lib/                  # Utility functions
├── public/               # Static assets
└── styles/               # Additional styles
\`\`\`

## 🎨 Customization

### Theme Configuration

The platform supports both light and dark themes. Customize colors in:
- `app/globals.css` - CSS variables
- `tailwind.config.js` - Tailwind configuration

### Adding New Courses

1. Add course data to `data/courses.json`
2. Create course content page in `app/courses/[courseId]/content/page.tsx`
3. Update navigation if needed

### Styling Components

All components use Tailwind CSS classes and shadcn/ui components. Customize by:
- Modifying component classes
- Updating global CSS variables
- Extending Tailwind configuration

## 🚀 Deployment

### Frontend (Vercel)

1. **Connect to Vercel**
   \`\`\`bash
   vercel --prod
   \`\`\`

2. **Set environment variables in Vercel dashboard**
   - `NEXT_PUBLIC_API_URL`
   - `JWT_SECRET`
   - `SEED_ADMIN_PIN1`
   - `SEED_ADMIN_PIN2`

3. **Deploy**
   \`\`\`bash
   vercel --prod
   \`\`\`

### Backend Setup

Follow the comprehensive backend development guide in `BACKEND_DEVELOPMENT_PROMPT.md` to set up the Node.js + Express backend with MongoDB Atlas.

## 🔒 Security Features

- **PIN-based Authentication**: Dual PIN system for admin access
- **JWT Tokens**: Secure session management
- **Device Binding**: PINs are bound to specific devices
- **Rate Limiting**: Protection against brute force attacks
- **Input Validation**: Comprehensive data validation
- **CORS Protection**: Configured for production security

## 📱 Mobile Support

The platform is fully responsive and optimized for:
- Mobile phones (320px+)
- Tablets (768px+)
- Desktops (1024px+)
- Large screens (1440px+)

## 🧪 Testing

\`\`\`bash
# Run linting
npm run lint

# Type checking
npx tsc --noEmit

# Build test
npm run build
\`\`\`

## 📈 Performance

- **Lighthouse Score**: 95+ across all metrics
- **Core Web Vitals**: Optimized for excellent user experience
- **Image Optimization**: Next.js automatic image optimization
- **Code Splitting**: Automatic route-based code splitting
- **Caching**: Optimized caching strategies

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
- Contact: support@tobixtech.com
- Documentation: Check `EDITING_GUIDE.md`

## 🙏 Acknowledgments

- [Next.js](https://nextjs.org/) - React framework
- [Tailwind CSS](https://tailwindcss.com/) - Utility-first CSS framework
- [shadcn/ui](https://ui.shadcn.com/) - Beautiful UI components
- [Lucide](https://lucide.dev/) - Beautiful icons
- [Vercel](https://vercel.com/) - Deployment platform

---

Built with ❤️ by TobixTech Team
