# ✅ Vercel Deployment Checklist

## Your Production Secret
```
NEXTAUTH_SECRET=xDHRWbAWfFPopjTlXmV+vdLWvVcm0E9DNRE5/poVp8s=
```

## Step-by-Step Deployment

### 1. ✅ Push to GitHub
```bash
git add .
git commit -m "Ready for Vercel deployment"
git push origin main
```

### 2. 🗄️ Create Vercel Postgres Database
1. Go to [vercel.com](https://vercel.com/dashboard) → **Storage**
2. Click **"Create Database"** → **"Postgres"**  
3. Name: `issue-tracker-prod`
4. Region: Choose closest to your users
5. **Copy the DATABASE_URL** (you'll need this!)

### 3. 🚀 Deploy Application
1. Go to [vercel.com/new](https://vercel.com/new)
2. Import your GitHub repository
3. Project name: `issue-tracker`
4. Framework: Next.js (auto-detected)
5. Click **"Deploy"**

### 4. ⚙️ Set Environment Variables
In Vercel Dashboard → Your Project → **Settings** → **Environment Variables**:

```env
DATABASE_URL=postgresql://[your-postgres-url-from-step-2]
NEXTAUTH_URL=https://[your-app].vercel.app
NEXTAUTH_SECRET=xDHRWbAWfFPopjTlXmV+vdLWvVcm0E9DNRE5/poVp8s=
GOOGLE_CLIENT_ID=1004223308157-lh0fd07i22s7v0ekp5fbnlhl6bg1psi8.apps.googleusercontent.com
GOOGLE_CLIENT_SECRET=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
```

### 5. 🔐 Update Google OAuth
1. [Google Cloud Console](https://console.cloud.google.com) → **APIs & Services** → **Credentials**
2. Edit your OAuth 2.0 Client
3. **Authorized JavaScript origins**: Add `https://[your-app].vercel.app`
4. **Authorized redirect URIs**: Add `https://[your-app].vercel.app/api/auth/callback/google`

### 6. 🗃️ Deploy Database Schema
After deployment, visit: `https://[your-app].vercel.app/api/setup-db`

Or run manually:
```bash
# Set production DATABASE_URL
export DATABASE_URL="your-vercel-postgres-url"
npx prisma migrate deploy
npx prisma generate
npm run db:seed  # Optional: add sample data
```

### 7. 🧪 Test Your Application
- [ ] Visit `https://[your-app].vercel.app`
- [ ] Test Google login/logout
- [ ] Create a new issue
- [ ] Edit an issue (as author)
- [ ] Assign issues to users
- [ ] Filter by status
- [ ] Check pagination
- [ ] View dashboard with charts

## Files Created for Deployment
- ✅ `VERCEL_DEPLOYMENT.md` - Complete deployment guide
- ✅ `vercel.json` - Build configuration
- ✅ Updated `package.json` - Added postinstall script
- ✅ `app/api/setup-db/route.ts` - Database setup endpoint
- ✅ Production secret generated

## Quick Commands
```bash
# Check deployment status
vercel ls

# View logs
vercel logs [deployment-url]

# Manual redeploy
vercel --prod

# Local development with production database
DATABASE_URL="your-prod-url" npm run dev
```

## Support Links
- 📚 [Vercel Docs](https://vercel.com/docs)
- 🗄️ [Vercel Postgres](https://vercel.com/docs/storage/vercel-postgres)
- 🔐 [NextAuth.js](https://next-auth.js.org/getting-started/example)
- 🛠️ [Prisma](https://www.prisma.io/docs)

## Troubleshooting
If you encounter issues, check:
1. Environment variables are set correctly
2. Database URL is accessible
3. Google OAuth URLs match your domain
4. Prisma migrations are deployed

Your app should be live at: `https://[your-project-name].vercel.app` 🎉