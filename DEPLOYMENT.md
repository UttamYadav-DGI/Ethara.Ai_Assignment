# 🌐 Deployment Guide - Free Tier

Deploy your Team Task Manager to production for **FREE!**

## Architecture

```
Frontend (Vercel)
       ↓
   API Calls (HTTPS)
       ↓
Backend (Render)
       ↓
Database (MongoDB Atlas)
```

## Part 1: MongoDB Atlas (Database)

### 1. Create Account
- Go to https://www.mongodb.com/cloud/atlas
- Sign up (free)
- Create organization
- Create project

### 2. Create Cluster
- Click "Create Deployment"
- Select "M0 Free" tier
- Choose cloud provider (any)
- Create cluster (wait 3-5 mins)

### 3. Add Connection String
- Click "Database" → "Connect"
- Choose "Drivers"
- Copy connection string
- Replace `<username>` and `<password>` with created credentials
- Add `/team-task-manager` after domain for database name

Example:
```
mongodb+srv://username:password@cluster.mongodb.net/team-task-manager
```

### 4. Network Access
- Go to "Network Access"
- Click "Add IP Address"
- Select "Allow Access from Anywhere" (free tier limitation)

## Part 2: Backend (Render)

### 1. Prepare Backend
```bash
# Create render.yaml (already in project root)
# Update backend/.env for production
```

### 2. Create Render Account
- Go to https://render.com
- Sign up (free)
- Connect GitHub account

### 3. Deploy Backend
- Click "New" → "Web Service"
- Select your GitHub repo
- Configure:
  - **Name:** team-task-manager-api
  - **Environment:** Node
  - **Build Command:** `npm install`
  - **Start Command:** `npm start`
  - **Plan:** Free

### 4. Add Environment Variables
In Render dashboard:
```
MONGODB_URI = (paste your MongoDB connection string)
JWT_SECRET = (any random strong string)
NODE_ENV = production
FRONTEND_URL = (your Vercel URL - add later)
```

### 5. Deploy
- Click "Create Web Service"
- Wait for deployment (2-3 mins)
- Copy your Render URL (e.g., https://team-task-manager-api.onrender.com)

## Part 3: Frontend (Vercel)

### 1. Prepare Frontend
```bash
# Update frontend/.env.example
VITE_API_URL=https://team-task-manager-api.onrender.com/api
```

### 2. Create Vercel Account
- Go to https://vercel.com
- Sign up (free)
- Connect GitHub account

### 3. Deploy Frontend
- Click "New Project"
- Select your GitHub repo
- Configure:
  - **Framework:** Vite
  - **Build Command:** `npm run build`
  - **Output Directory:** `dist`

### 4. Add Environment Variables
```
VITE_API_URL = https://team-task-manager-api.onrender.com/api
```

### 5. Deploy
- Click "Deploy"
- Wait for deployment (1-2 mins)
- Your site is live! 🎉

## Part 4: Complete Setup

### 1. Update Backend FRONTEND_URL
Back to Render:
- Go to your Web Service
- Environment → Edit Variables
- Update `FRONTEND_URL` with your Vercel URL
- Redeploy

### 2. Test Application
- Open your Vercel URL
- Sign up
- Create projects and tasks
- Test all features

## Monitoring

### Render Backend
- Visit https://dashboard.render.com
- View logs in real-time
- Monitor performance

### Vercel Frontend
- Visit https://vercel.com/dashboard
- View deployment logs
- See analytics

### MongoDB Atlas
- Visit https://cloud.mongodb.com
- View collections
- Monitor usage

## Scaling Up (After Free Tier)

When you outgrow free tier:

1. **MongoDB:** Upgrade to M2+ ($9+/month)
2. **Render:** Upgrade to Standard ($7+/month)
3. **Vercel:** Vercel Pro ($20/month) optional

## Troubleshooting

### Deployment fails
```bash
# 1. Check build logs
# 2. Ensure all env variables set
# 3. Run: npm install && npm run build locally
```

### Backend not responding
```bash
# 1. Check Render logs
# 2. Verify MongoDB URI correct
# 3. Check Network Access in MongoDB Atlas
```

### Frontend shows "Cannot reach API"
```bash
# 1. Check VITE_API_URL in Vercel env vars
# 2. Verify backend is deployed and running
# 3. Check CORS in backend (should allow Vercel domain)
```

### Database connection timeout
```bash
# 1. Check connection string is correct
# 2. Add MongoDB cluster IP to Network Access
# 3. Verify password doesn't have special characters (or escape them)
```

## Free Tier Limits

- **Render:** 750 free hours/month (one project runs 24/7)
- **Vercel:** Unlimited deployments, generous free tier
- **MongoDB:** 512MB storage, 100,000 read/write operations

This is **perfectly fine** for MVP and small teams!

## Final Checklist

- ✅ MongoDB Atlas cluster created and connected
- ✅ Backend deployed on Render
- ✅ Frontend deployed on Vercel
- ✅ Environment variables configured
- ✅ Application tested and working
- ✅ Domains configured correctly

## You're Live! 🚀

Your Team Task Manager is now accessible to anyone on the internet!

**Performance Notes:**
- First request may take 15-30 seconds (free tier warm-up)
- Subsequent requests are fast
- Database queries are optimized

Enjoy! 🎉
