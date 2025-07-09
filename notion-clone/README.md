# Notion Clone - Your Connected Workspace

A modern, full-featured Notion-like application built with Next.js, TypeScript, Prisma, and NextAuth.js. Create, organize, and collaborate on content with a beautiful, intuitive interface.

![Notion Clone](https://via.placeholder.com/800x400/3B82F6/FFFFFF?text=Notion+Clone)

## ✨ Features

### 🔐 Authentication & Security
- **Multiple Auth Providers**: Google, GitHub, and email/password authentication
- **Secure Sessions**: JWT-based session management with NextAuth.js
- **User Management**: Complete user registration and profile management

### 📝 Rich Text Editing
- **Block-based Editor**: Powerful TipTap editor with Notion-like functionality
- **Rich Formatting**: Headers, lists, quotes, code blocks, and more
- **Real-time Auto-save**: Changes are automatically saved as you type
- **Image Support**: Upload and embed images directly in your content

### 🏢 Workspace Management
- **Personal Workspaces**: Each user gets their own workspace
- **Page Hierarchy**: Organize pages with nested structure
- **Quick Actions**: Easy access to common tasks
- **Recent Pages**: Keep track of your recently edited content

### 🎨 Modern UI/UX
- **Clean Design**: Inspired by Notion's interface
- **Responsive Layout**: Works perfectly on desktop and mobile
- **Dark/Light Mode**: Supports system theme preferences
- **Smooth Animations**: Polished interactions and transitions

### 🗄️ Database Features
- **PostgreSQL/SQLite**: Production-ready database with Prisma ORM
- **Full Schema**: Users, workspaces, pages, blocks, and relationships
- **Type Safety**: Full TypeScript integration with database models

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ 
- npm or yarn
- PostgreSQL database (or use SQLite for development)

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd notion-clone
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   ```bash
   cp .env.example .env
   ```
   
   Edit `.env` with your configuration:
   ```env
   # Database
   DATABASE_URL="postgresql://username:password@localhost:5432/notion_clone"
   # or for SQLite (development)
   DATABASE_URL="file:./dev.db"

   # NextAuth.js
   NEXTAUTH_URL="http://localhost:3000"
   NEXTAUTH_SECRET="your-secret-key-here"

   # Authentication Providers
   GOOGLE_CLIENT_ID="your-google-client-id"
   GOOGLE_CLIENT_SECRET="your-google-client-secret"
   GITHUB_ID="your-github-client-id"
   GITHUB_SECRET="your-github-client-secret"
   ```

4. **Set up the database**
   ```bash
   npx prisma migrate dev --name init
   npx prisma generate
   ```

5. **Run the development server**
   ```bash
   npm run dev
   ```

6. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## 🔧 Environment Configuration

### Required Environment Variables

| Variable | Description | Required |
|----------|-------------|----------|
| `DATABASE_URL` | Database connection string | ✅ |
| `NEXTAUTH_URL` | Base URL of your application | ✅ |
| `NEXTAUTH_SECRET` | Secret for NextAuth.js | ✅ |

### Authentication API Keys

#### Google OAuth Setup
1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project or select existing
3. Enable Google+ API
4. Create OAuth 2.0 credentials
5. Add authorized redirect URIs: `http://localhost:3000/api/auth/callback/google`

#### GitHub OAuth Setup
1. Go to GitHub Settings > Developer settings > OAuth Apps
2. Create a new OAuth App
3. Set Authorization callback URL: `http://localhost:3000/api/auth/callback/github`

### Optional Services

| Variable | Description | Use Case |
|----------|-------------|----------|
| `CLOUDINARY_*` | File upload service | Image/file uploads |
| `EMAIL_*` | Email service config | Notifications |

## 📁 Project Structure

```
notion-clone/
├── src/
│   ├── app/                    # Next.js App Router
│   │   ├── api/auth/          # NextAuth.js API routes
│   │   ├── auth/              # Authentication pages
│   │   ├── workspace/         # Workspace and page routes
│   │   └── globals.css        # Global styles
│   ├── components/            # React components
│   │   ├── editor/            # Rich text editor components
│   │   ├── layout/            # Layout components
│   │   └── navigation/        # Navigation components
│   ├── lib/                   # Utility libraries
│   │   ├── auth.ts            # NextAuth configuration
│   │   ├── prisma.ts          # Prisma client
│   │   └── utils.ts           # Helper functions
│   └── types/                 # TypeScript type definitions
├── prisma/
│   ├── schema.prisma          # Database schema
│   └── migrations/            # Database migrations
├── .env.example               # Environment variables template
├── .env                       # Local environment variables
└── README.md                  # This file
```

## 🗄️ Database Schema

The application uses a comprehensive database schema designed for a Notion-like workspace:

### Core Models
- **User**: User accounts and authentication
- **Workspace**: User workspaces and organization
- **Page**: Individual pages with content
- **Block**: Content blocks within pages
- **WorkspaceMember**: Team collaboration

### Key Relationships
- Users can own multiple workspaces
- Workspaces contain multiple pages
- Pages can have child pages (hierarchy)
- Pages contain multiple content blocks

## 🛠️ Development

### Available Scripts

```bash
# Development
npm run dev          # Start development server
npm run build        # Build for production
npm run start        # Start production server

# Database
npx prisma studio    # Open Prisma Studio
npx prisma migrate   # Run database migrations
npx prisma generate  # Generate Prisma client

# Linting & Formatting
npm run lint         # Run ESLint
npm run type-check   # Run TypeScript check
```

### Tech Stack

- **Frontend**: Next.js 14, React, TypeScript, Tailwind CSS
- **Backend**: Next.js API Routes, Prisma ORM
- **Database**: PostgreSQL/SQLite
- **Authentication**: NextAuth.js
- **Editor**: TipTap (ProseMirror-based)
- **UI Components**: Lucide React, Radix UI
- **Styling**: Tailwind CSS

## 🔒 Security Features

- **Authentication**: Multiple secure auth providers
- **Session Management**: Secure JWT sessions
- **Database Security**: Parameterized queries with Prisma
- **Environment Isolation**: Separate development/production configs
- **Type Safety**: Full TypeScript coverage

## 🚀 Deployment

### Vercel (Recommended)
1. Connect your GitHub repository to Vercel
2. Set environment variables in Vercel dashboard
3. Deploy automatically on push to main branch

### Other Platforms
- **Netlify**: Full support for Next.js
- **Railway**: Database and app hosting
- **AWS/GCP**: Full cloud deployment options

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- **Notion** for the inspiration and design patterns
- **TipTap** for the excellent rich text editor
- **NextAuth.js** for authentication
- **Prisma** for the amazing ORM
- **Vercel** for the hosting platform

## 📧 Support

If you have any questions or need help setting up the application:

1. Check the [Issues](https://github.com/your-repo/issues) page
2. Create a new issue with detailed information
3. Join our community discussions

---

**Happy Building! 🚀**
