# 🚀 Vercel Deployment Guide for Issue Tracker

## Step 1: Create Vercel Postgres Database

### Option A: Through Vercel Dashboard (Recommended)
1. Go to [vercel.com](https://vercel.com) and sign in
2. Click **"Storage"** in the top navigation
3. Click **"Create Database"**
4. Select **"Postgres"**
5. Name your database: `issue-tracker-prod`
6. Select region closest to your users
7. Click **"Create"**
8. Copy the **DATABASE_URL** from the **".env.local"** tab

### Option B: Through Vercel CLI
```bash
# Install Vercel CLI
npm i -g vercel

# Login to Vercel
vercel login

# Create database
vercel postgres create issue-tracker-prod
```

## Step 2: Deploy Your Application to Vercel

### Method 1: GitHub Integration (Recommended)

1. **Push to GitHub** (if not already done):
   ```bash
   git add .
   git commit -m "Ready for production deployment"
   git push origin main
   ```

2. **Import to Vercel**:
   - Go to [vercel.com/new](https://vercel.com/new)
   - Select your GitHub repository
   - Click **"Import"**
   - Project name: `issue-tracker`
   - Framework: **Next.js** (auto-detected)
   - Click **"Deploy"**

### Method 2: Vercel CLI
```bash
# In your project directory
vercel

# Follow the prompts:
# - Link to existing project? No
# - Project name: issue-tracker
# - Directory: ./
# - Override settings? No
```

## Step 3: Configure Environment Variables

1. **In Vercel Dashboard**:
   - Go to your project → **Settings** → **Environment Variables**
   - Add these variables:

```env
DATABASE_URL=postgresql://username:password@host/database_name
NEXTAUTH_URL=https://your-app.vercel.app
NEXTAUTH_SECRET=your-production-secret
GOOGLE_CLIENT_ID=1004223308157-lh0fd07i22s7v0ekp5fbnlhl6bg1psi8.apps.googleusercontent.com
GOOGLE_CLIENT_SECRET=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
```

### Generate Production Secret:
```bash
# Run this command and use the output for NEXTAUTH_SECRET
node -e "console.log(require('crypto').randomBytes(32).toString('base64'))"
```

## Step 4: Update Google OAuth Settings

1. Go to [Google Cloud Console](https://console.cloud.google.com)
2. **APIs & Services** → **Credentials**
3. Click on your OAuth 2.0 Client ID
4. Add to **Authorized JavaScript origins**:
   - `https://your-app.vercel.app`
5. Add to **Authorized redirect URIs**:
   - `https://your-app.vercel.app/api/auth/callback/google`

## Step 5: Deploy Database Schema

### Option A: Vercel Dashboard (Recommended)
1. Go to your Vercel project dashboard
2. Click **"Functions"** tab
3. Click **"View Function Logs"**
4. In the **"Source"** dropdown, select your deployment
5. Run migration command in Vercel's environment

### Option B: Local Migration to Production Database
```bash
# Set your production DATABASE_URL temporarily
export DATABASE_URL="your-vercel-postgres-url"

# Deploy migrations
npx prisma migrate deploy

# Generate Prisma client
npx prisma generate

# Optional: Seed with sample data
npm run db:seed
```

### Option C: Create Migration Function
Create this API route for one-time setup:
```typescript
// app/api/setup-db/route.ts
import { NextResponse } from 'next/server';
import { exec } from 'child_process';
import { promisify } from 'util';

const execAsync = promisify(exec);

export async function POST() {
  try {
    // Deploy migrations
    await execAsync('npx prisma migrate deploy');
    
    // Generate client
    await execAsync('npx prisma generate');
    
    return NextResponse.json({ 
      success: true, 
      message: 'Database setup complete' 
    });
  } catch (error) {
    return NextResponse.json({ 
      success: false, 
      error: error.message 
    }, { status: 500 });
  }
}
```

Then call: `https://your-app.vercel.app/api/setup-db` (POST request)

## Step 6: Verify Deployment

1. **Check Application**: Visit `https://your-app.vercel.app`
2. **Test Authentication**: Try Google login
3. **Test Features**:
   - Create an issue
   - Edit an issue
   - Assign issues
   - Filter by status
   - Check dashboard

## Troubleshooting

### Common Issues:

1. **Database Connection Error**:
   - Verify DATABASE_URL is correct
   - Check Vercel Postgres is running
   - Ensure region compatibility

2. **Authentication Issues**:
   - Check NEXTAUTH_URL matches your domain
   - Verify Google OAuth redirect URIs
   - Ensure NEXTAUTH_SECRET is set

3. **Migration Errors**:
   - Check Prisma schema syntax
   - Verify database permissions
   - Try resetting migrations in development

4. **Build Errors**:
   - Check all dependencies are in package.json
   - Verify TypeScript errors are fixed
   - Check Vercel build logs

### Useful Commands:
```bash
# Check deployment status
vercel ls

# View logs
vercel logs

# Redeploy
vercel --prod
```

## Monitoring & Maintenance

1. **Database Monitoring**: Check Vercel Storage dashboard
2. **Application Logs**: Monitor Vercel Function logs
3. **Performance**: Use Vercel Analytics
4. **Backups**: Vercel Postgres includes automatic backups

## Quick Commands Reference

```bash
# Deploy to production
git push origin main  # Auto-deploys if connected to GitHub

# Manual deployment
vercel --prod

# Check logs
vercel logs --follow

# Run migrations on production DB
DATABASE_URL="your-prod-url" npx prisma migrate deploy
```

Your application will be available at: `https://your-project-name.vercel.app`