# 🚀 Issue Tracker

A modern, full-featured issue tracking system built with Next.js 15, featuring Google OAuth authentication, real-time updates, and comprehensive project management capabilities.

![Next.js](https://img.shields.io/badge/Next.js-15.5.4-black?style=for-the-badge&logo=next.js)
![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue?style=for-the-badge&logo=typescript)
![Prisma](https://img.shields.io/badge/Prisma-6.16.2-2D3748?style=for-the-badge&logo=prisma)
![NextAuth](https://img.shields.io/badge/NextAuth.js-4.24-purple?style=for-the-badge&logo=auth0)
![Vercel](https://img.shields.io/badge/Vercel-Deployment-black?style=for-the-badge&logo=vercel)

## 🌟 Features

### 🔐 **Authentication & Authorization**
- **Google OAuth Integration** - Secure single sign-on with Google accounts
- **Role-based Access Control** - Different permissions for authenticated vs anonymous users
- **Ownership-based Permissions** - Users can only edit/delete their own issues
- **Session Management** - Persistent login sessions with automatic token refresh

### 📋 **Issue Management**
- **Create Issues** - Rich text editor with Markdown support using SimpleMDE
- **Edit & Update** - Real-time issue updates with optimistic UI
- **Status Tracking** - Three-state workflow: Open → In Progress → Closed
- **Issue Assignment** - Assign issues to team members with user selection dropdown
- **Comprehensive Issue Details** - Title, description, status, author, assignee, timestamps

### 🎯 **Advanced Features**
- **Smart Filtering** - Filter issues by status with URL persistence
- **Pagination System** - Efficient data loading with 10 issues per page
- **Search & Navigation** - URL-based state management for bookmarkable filters
- **Responsive Design** - Works perfectly on desktop, tablet, and mobile devices

### 📊 **Analytics Dashboard**
- **Interactive Charts** - Pie charts and bar charts showing issue distribution
- **Real-time Statistics** - Live counts of open, in-progress, and closed issues
- **Latest Issues Widget** - Quick view of the 5 most recent issues
- **Visual Data Representation** - Built with Recharts for beautiful visualizations

### 🎨 **User Experience**
- **Modern UI Components** - Built with Radix UI for accessibility and consistency
- **Loading States** - Smooth loading animations and skeleton screens
- **Error Handling** - Comprehensive error messages and fallback UI
- **Optimistic Updates** - Instant UI feedback for better user experience

## 🛠️ Tech Stack

### **Frontend**
- **[Next.js 15](https://nextjs.org/)** - React framework with App Router
- **[TypeScript](https://www.typescriptlang.org/)** - Type-safe JavaScript
- **[Radix UI](https://www.radix-ui.com/)** - Unstyled, accessible UI components
- **[Tailwind CSS](https://tailwindcss.com/)** - Utility-first CSS framework
- **[Recharts](https://recharts.org/)** - Composable charting library

### **Backend & Database**
- **[Prisma ORM](https://www.prisma.io/)** - Type-safe database toolkit
- **[PostgreSQL](https://www.postgresql.org/)** - Production database (Vercel Postgres)
- **[SQLite](https://www.sqlite.org/)** - Development database
- **[NextAuth.js](https://next-auth.js.org/)** - Authentication for Next.js

### **Development Tools**
- **[ESLint](https://eslint.org/)** - Code linting and formatting
- **[TypeScript](https://www.typescriptlang.org/)** - Static type checking
- **[Prisma Studio](https://www.prisma.io/studio)** - Database GUI
- **[Vercel](https://vercel.com/)** - Deployment and hosting

### **Additional Libraries**
- **[React SimpleMDE](https://github.com/sparksuite/react-simplemde-editor)** - Markdown editor
- **[Axios](https://axios-http.com/)** - HTTP client
- **[React Hook Form](https://react-hook-form.com/)** - Form handling
- **[Zod](https://zod.dev/)** - Schema validation

## 📁 Project Structure

```
my-app/
├── app/                          # Next.js App Router
│   ├── api/                      # API routes
│   │   ├── auth/[...nextauth]/   # NextAuth.js configuration
│   │   ├── issues/               # Issues CRUD operations
│   │   ├── users/                # User management
│   │   └── setup-db/             # Database setup utility
│   ├── components/               # Reusable UI components
│   │   ├── IssueStatusBadge.tsx  # Status display component
│   │   ├── IssueStatusFilter.tsx # Status filter dropdown
│   │   ├── IssueStats.tsx        # Analytics charts
│   │   ├── Pagination.tsx        # Pagination controls
│   │   ├── AssigneeSelect.tsx    # User assignment dropdown
│   │   └── Spinner.tsx           # Loading spinner
│   ├── issues/                   # Issue-related pages
│   │   ├── [id]/                 # Dynamic issue pages
│   │   ├── new/                  # Create issue page
│   │   └── page.tsx              # Issues list page
│   ├── utils/                    # Utility functions
│   ├── globals.css               # Global styles
│   ├── layout.tsx                # Root layout
│   ├── navbar.tsx                # Navigation component
│   └── page.tsx                  # Dashboard/home page
├── lib/                          # Configuration files
│   └── auth.ts                   # NextAuth configuration
├── prisma/                       # Database configuration
│   ├── schema.prisma             # Database schema
│   ├── seed.ts                   # Database seeding
│   └── client.ts                 # Prisma client setup
├── public/                       # Static assets
├── types/                        # TypeScript type definitions
└── README.md                     # This file
```

## 🚀 Getting Started

### **Prerequisites**
- Node.js 18.17 or later
- npm or yarn package manager
- Google Cloud Platform account (for OAuth)

### **1. Clone the Repository**
```bash
git clone https://github.com/yourusername/issue-tracker.git
cd issue-tracker
```

### **2. Install Dependencies**
```bash
npm install
```

### **3. Environment Setup**
Create a `.env` file in the root directory:

```env
# Database (SQLite for development)
DATABASE_URL="file:./dev.db"

# NextAuth Configuration
NEXTAUTH_URL="http://localhost:3000"
NEXTAUTH_SECRET="your-secret-key-here"

# Google OAuth (Create at console.cloud.google.com)
GOOGLE_CLIENT_ID="your-google-client-id"
GOOGLE_CLIENT_SECRET="your-google-client-secret"
```

### **4. Database Setup**
```bash
# Generate Prisma client
npm run db:generate

# Run database migrations
npm run db:migrate

# Seed database with sample data (optional)
npm run db:seed
```

### **5. Start Development Server**
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## 🔧 Available Scripts

| Script | Description |
|--------|-------------|
| `npm run dev` | Start development server with Turbopack |
| `npm run build` | Build production application |
| `npm start` | Start production server |
| `npm run lint` | Run ESLint code linting |
| `npm run db:generate` | Generate Prisma client |
| `npm run db:migrate` | Run database migrations |
| `npm run db:seed` | Seed database with sample data |
| `npm run db:studio` | Open Prisma Studio GUI |
| `npm run db:push` | Push schema changes to database |

## 🗄️ Database Schema

### **Core Models**

#### **Issue**
```prisma
model Issue {
  id          Int      @id @default(autoincrement())
  title       String
  description String
  status      Status   @default(OPEN)
  createdAt   DateTime @default(now())
  updatedAt   DateTime @updatedAt
  authorId    String?  // User who created the issue
  assigneeId  String?  // User assigned to the issue
  author      User?    @relation("IssueAuthor")
  assignee    User?    @relation("IssueAssignee")
}
```

#### **User** (NextAuth.js Schema)
```prisma
model User {
  id              String   @id @default(cuid())
  name            String?
  email           String?  @unique
  emailVerified   DateTime?
  image           String?
  accounts        Account[]
  sessions        Session[]
  authoredIssues  Issue[]  @relation("IssueAuthor")
  assignedIssues  Issue[]  @relation("IssueAssignee")
}
```

#### **Status Enum**
```prisma
enum Status {
  OPEN
  IN_PROGRESS  
  CLOSED
}
```

## 🎮 API Endpoints

### **Authentication**
- `GET/POST /api/auth/*` - NextAuth.js authentication endpoints
- `GET /api/auth/session` - Get current user session

### **Issues**
- `GET /api/issues` - List issues with filtering and pagination
  - Query params: `page`, `limit`, `status`
- `POST /api/issues` - Create new issue (authenticated)
- `GET /api/issues/[id]` - Get issue by ID
- `PATCH /api/issues/[id]` - Update issue (owner only)
- `DELETE /api/issues/[id]` - Delete issue (owner only)

### **Users**
- `GET /api/users` - List all users (for assignment dropdown)

### **Utilities**
- `POST /api/setup-db` - Database connection and setup verification

## 🚀 Deployment

### **Deploy to Vercel (Recommended)**

1. **Prepare for deployment:**
   ```bash
   npm run build  # Ensure build passes
   git add .
   git commit -m "Ready for deployment"
   git push origin main
   ```

2. **Create Vercel Postgres Database:**
   - Go to [vercel.com/dashboard](https://vercel.com/dashboard) → Storage
   - Create Database → PostgreSQL
   - Name: `issue-tracker-prod`

3. **Deploy to Vercel:**
   - Import your GitHub repository at [vercel.com/new](https://vercel.com/new)
   - Project name: `issue-tracker`
   - Framework: Next.js (auto-detected)

4. **Set Environment Variables:**
   In Vercel Project Settings → Environment Variables:
   ```env
   DATABASE_URL=postgresql://default:xxx@ep-xxx.postgres.vercel-storage.com/verceldb?sslmode=require
   NEXTAUTH_URL=https://your-app.vercel.app
   NEXTAUTH_SECRET=ieDuoRZwp4jRGHZFzcAHoK5GVlW1iwmjxSn9S/AzOGk=
   GOOGLE_CLIENT_ID=your-google-client-id
   GOOGLE_CLIENT_SECRET=your-google-client-secret
   ```

5. **Update Google OAuth:**
   - Add `https://your-app.vercel.app` to authorized origins
   - Add `https://your-app.vercel.app/api/auth/callback/google` to redirect URIs

6. **Deploy Database Schema:**
   ```bash
   # Set production DATABASE_URL locally
   export DATABASE_URL="your-vercel-postgres-url"
   npx prisma migrate deploy
   npx prisma db seed
   ```

### **Alternative Deployment Platforms**

<details>
<summary>Railway Deployment</summary>

1. Connect GitHub repository to Railway
2. Add environment variables in Railway dashboard
3. Deploy automatically on git push
4. Use Railway PostgreSQL for database

</details>

<details>
<summary>Netlify Deployment</summary>

1. Build command: `npm run build`
2. Publish directory: `.next`
3. Add environment variables in site settings
4. Use external PostgreSQL provider (Supabase, PlanetScale)

</details>

## 🔧 Configuration

### **Google OAuth Setup**

1. **Create Google Cloud Project:**
   - Go to [Google Cloud Console](https://console.cloud.google.com)
   - Create new project or select existing

2. **Enable Google+ API:**
   - APIs & Services → Library
   - Search for "Google+ API" → Enable

3. **Create OAuth Credentials:**
   - APIs & Services → Credentials → Create Credentials → OAuth 2.0 Client ID
   - Application type: Web application
   - Authorized origins: `http://localhost:3000` (development)
   - Redirect URIs: `http://localhost:3000/api/auth/callback/google`

4. **Copy Client ID & Secret** to your `.env` file

### **Database Configuration**

#### **Development (SQLite)**
```env
DATABASE_URL="file:./dev.db"
```

#### **Production (PostgreSQL)**
```env
DATABASE_URL="postgresql://username:password@host:port/database?sslmode=require"
```

### **Environment Variables Reference**

| Variable | Description | Required | Example |
|----------|-------------|----------|---------|
| `DATABASE_URL` | Database connection string | Yes | `file:./dev.db` |
| `NEXTAUTH_URL` | Application URL | Yes | `http://localhost:3000` |
| `NEXTAUTH_SECRET` | JWT signing secret | Yes | `randomBase64String` |
| `GOOGLE_CLIENT_ID` | Google OAuth Client ID | Yes | `123-abc.apps.googleusercontent.com` |
| `GOOGLE_CLIENT_SECRET` | Google OAuth Client Secret | Yes | `GOCSPX-xxx` |

## 🐛 Troubleshooting

### **Common Issues**

#### **Build Errors**
```bash
# Clear Next.js cache
rm -rf .next

# Regenerate Prisma client
npm run db:generate

# Rebuild application
npm run build
```

#### **Database Connection Issues**
```bash
# Check database URL format
echo $DATABASE_URL

# Test database connection
npx prisma db push

# Reset database (development only)
npm run db:migrate:reset
```

#### **Authentication Issues**
- Verify Google OAuth credentials
- Check NEXTAUTH_URL matches your domain
- Ensure NEXTAUTH_SECRET is set and secure

### **Development Tips**

#### **Database Management**
```bash
# View data in Prisma Studio
npm run db:studio

# Reset database and reseed
npm run db:migrate:reset

# Generate new migration
npx prisma migrate dev --name "description"
```

#### **Code Quality**
```bash
# Run linting
npm run lint

# Fix auto-fixable issues
npm run lint -- --fix

# Type checking
npx tsc --noEmit
```

## 🤝 Contributing

We welcome contributions! Please follow these steps:

1. **Fork the repository**
2. **Create a feature branch:** `git checkout -b feature/amazing-feature`
3. **Make your changes** and ensure tests pass
4. **Commit your changes:** `git commit -m 'Add amazing feature'`
5. **Push to branch:** `git push origin feature/amazing-feature`
6. **Open a Pull Request**

### **Development Guidelines**

- Follow TypeScript best practices
- Write meaningful commit messages
- Add proper error handling
- Include JSDoc comments for functions
- Test your changes thoroughly

### **Code Style**

- Use Prettier for formatting
- Follow ESLint rules
- Use descriptive variable names
- Keep functions small and focused

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- **[Next.js Team](https://nextjs.org/)** - Amazing React framework
- **[Prisma Team](https://www.prisma.io/)** - Excellent database toolkit
- **[NextAuth.js](https://next-auth.js.org/)** - Seamless authentication
- **[Radix UI](https://www.radix-ui.com/)** - Accessible components
- **[Vercel](https://vercel.com/)** - Fantastic hosting platform

## 📞 Support

- **Documentation Issues:** Open an issue on GitHub
- **Feature Requests:** Create a GitHub issue with the `enhancement` label
- **Bug Reports:** Use the bug report template

---

**Built with ❤️ using Next.js 15 and modern web technologies**
