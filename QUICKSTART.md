# 🚀 Quick Start Guide - 30 Minutes

Get your Team Task Manager running locally in just 30 minutes!

## Prerequisites

- Node.js (v16+)
- npm or yarn
- MongoDB Atlas account (free tier)
- Git

## Step 1: Clone & Setup Backend (10 mins)

```bash
# 1. Navigate to backend
cd backend

# 2. Install dependencies
npm install

# 3. Create .env file
cp .env.example .env

# 4. Get MongoDB URI
# - Go to https://www.mongodb.com/cloud/atlas
# - Create free account
# - Create cluster
# - Get connection string
# - Update .env with URI

# 5. Generate JWT secret (any random string)
# Example: "your_secret_key_12345"
# Update JWT_SECRET in .env

# 6. Start backend
npm run dev
# Should see: "Server running on port 5000"
```

## Step 2: Setup Frontend (10 mins)

```bash
# 1. Open new terminal, navigate to frontend
cd frontend

# 2. Install dependencies
npm install

# 3. Create .env file
cp .env.example .env

# 4. Update if needed (defaults should work)
# VITE_API_URL=http://localhost:5000/api

# 5. Start frontend
npm run dev
# Should see: "Local: http://localhost:5173"
```

## Step 3: Test Application (10 mins)

1. **Open browser:** http://localhost:5173

2. **Sign up:**
   - Click "Sign up"
   - Enter name, email, password
   - Click "Sign up"

3. **Create Project:**
   - Click "New Project"
   - Enter project name
   - Click "Create"

4. **Add Tasks:**
   - Click on project
   - Click "Add Task"
   - Enter task title and details
   - Change status from dropdown

5. **Explore:**
   - Navigate between pages
   - Create multiple tasks
   - Test all status changes

## Common Issues

### Backend won't start
```bash
# Check MongoDB connection
# 1. Verify .env has correct MONGODB_URI
# 2. Check MongoDB Atlas allows connections
# 3. Try: npm install && npm run dev
```

### Frontend shows "Cannot reach API"
```bash
# 1. Ensure backend is running (port 5000)
# 2. Check VITE_API_URL in .env
# 3. Clear browser cache and refresh
```

### Axios errors in console
```bash
# Check CORS settings in backend/server.js
# Should have: origin: process.env.FRONTEND_URL
```

## Next Steps

1. **Read** [DEPLOYMENT.md](./DEPLOYMENT.md) to deploy to production
2. **Customize** styling in `frontend/src/pages/*.css`
3. **Extend** with more features:
   - User profiles
   - Task comments/attachments
   - Team notifications
   - Advanced filtering

## Useful Commands

**Backend:**
```bash
npm run dev      # Start development server
npm start        # Start production server
```

**Frontend:**
```bash
npm run dev      # Start development server
npm run build    # Build for production
npm run preview  # Preview production build
```

## MongoDB Atlas Free Tier

- 512MB storage (free)
- 3 free shared clusters
- Unlimited connections
- Enough for development and testing

## You're All Set! 🎉

Your Team Task Manager is now running!

- **Frontend:** http://localhost:5173
- **Backend API:** http://localhost:5000/api
- **MongoDB:** Connected to Atlas

Start building! 🚀
