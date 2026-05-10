# 🚀 Team Task Manager - Full-Stack MERN Application

> A production-ready, comprehensive web application for team collaboration, project management, and task tracking with role-based access control.

[![MERN Stack](https://img.shields.io/badge/Stack-MERN-61DAFB?style=flat-square)](https://www.mongodb.com/)
[![Node](https://img.shields.io/badge/Node-v16+-339933?style=flat-square)](https://nodejs.org/)
[![React](https://img.shields.io/badge/React-18+-61DAFB?style=flat-square)](https://react.dev/)
[![MIT License](https://img.shields.io/badge/License-MIT-green?style=flat-square)](LICENSE)
[![Production Ready](https://img.shields.io/badge/Status-Production%20Ready-brightgreen?style=flat-square)](#)

---

## 📋 Table of Contents

- [Overview](#overview)
- [🎯 Key Features](#-key-features)
- [📐 Architecture](#-architecture)
- [🛠 Tech Stack](#-tech-stack)
- [📁 Project Structure](#-project-structure)
- [💾 Database Models](#-database-models)
- [🔐 Role-Based Access Control](#-role-based-access-control)
- [📡 API Endpoints](#-api-endpoints)
- [⚙️ Installation & Setup](#️-installation--setup)
- [🚀 Quick Start (30 Minutes)](#-quick-start-30-minutes)
- [🌐 Deployment (Free Tier)](#-deployment-free-tier)
- [📖 Complete File Manifest](#-complete-file-manifest)
- [🤝 Contributing](#-contributing)
- [📄 License](#-license)

---

## Overview

**Team Task Manager** is a complete full-stack MERN application built to demonstrate professional-grade development practices. It enables teams to collaborate efficiently by managing projects, assigning tasks, tracking progress, and controlling access with role-based permissions.

### What Solves

✅ **Team Collaboration** - Centralized project and task management  
✅ **Progress Tracking** - Real-time status updates and dashboards  
✅ **Access Control** - Secure role-based permissions (Admin/Member)  
✅ **Scalability** - Production-ready architecture for enterprise use  
✅ **Security** - JWT authentication, password hashing, CORS protection  

---

## 🎯 Key Features

### 🔐 Authentication & Security
- **User Registration & Login** with email validation
- **JWT-based Authentication** with secure token management
- **Bcrypt Password Hashing** for enhanced security
- **Protected Routes** with middleware authentication
- **Session Management** with localStorage token persistence
- **Auto-token Injection** in all API requests

### 👥 User & Project Management
- **User Profiles** with role assignment (Admin/Member)
- **Project Creation** by authenticated users
- **Team Management** - Add/remove members from projects
- **Member Role Assignment** with permission control
- **Project Status Tracking** (Active/Completed/On Hold)

### 📊 Task Management System
- **Full Task CRUD** - Create, Read, Update, Delete operations
- **Status Tracking** - Todo → In Progress → In Review → Completed
- **Priority Levels** - Low, Medium, High
- **Task Assignment** - Assign tasks to team members
- **Due Date Management** - Set and track deadlines
- **Comments & Discussions** - Collaborate on individual tasks
- **Task Filtering** - Filter by status, priority, assignee

### 📈 Dashboard & Analytics
- **Project Dashboard** - Overview of all projects
- **Kanban Board** - Visual task status management
- **Task Overview** - See all tasks assigned to you
- **Status Overview** - Count tasks by status
- **Overdue Tracking** - Identify overdue tasks
- **Personal Task List** - Tasks assigned to current user

### 🎨 User Experience
- **Responsive Design** - Mobile, tablet, and desktop optimized
- **Professional UI** - Clean, modern interface with Lucide icons
- **Real-time Updates** - Instant reflection of changes
- **Navigation** - Intuitive multi-page navigation
- **Error Handling** - User-friendly error messages
- **Loading States** - Visual feedback for async operations

---

## 📐 Architecture

### System Architecture Diagram

```
┌─────────────────────────────────────────────────────────┐
│                     CLIENT LAYER                         │
│  (React 18 + Vite + Axios + Context API)               │
│  ┌──────────────────────────────────────────────────┐  │
│  │ Pages: Login | Signup | Dashboard | ProjectView │  │
│  │ Components: Navigation, Forms, Kanban Board      │  │
│  │ State: AuthContext, ProjectContext              │  │
│  └──────────────────────────────────────────────────┘  │
└────────────────────────┬────────────────────────────────┘
                         │
                  HTTPS API Calls
                         │
┌────────────────────────▼────────────────────────────────┐
│                   SERVER LAYER                          │
│  (Node.js + Express.js + Middleware)                   │
│  ┌──────────────────────────────────────────────────┐  │
│  │ Routes: /auth | /projects | /tasks              │  │
│  │ Controllers: authController, projectController  │  │
│  │ Middleware: JWT Auth, CORS, Error Handling      │  │
│  │ Services: Business logic & validation           │  │
│  └──────────────────────────────────────────────────┘  │
└────────────────────────┬────────────────────────────────┘
                         │
                   MongoDB Protocol
                         │
┌────────────────────────▼────────────────────────────────┐
│                  DATABASE LAYER                         │
│  (MongoDB + Mongoose ODM)                              │
│  ┌──────────────────────────────────────────────────┐  │
│  │ Collections: users | projects | tasks           │  │
│  │ Indexes: For optimized queries                  │  │
│  │ Relationships: Populated references              │  │
│  └──────────────────────────────────────────────────┘  │
└──────────────────────────────────────────────────────────┘

                    DATA FLOW
                    
User Action (Frontend)
        ↓
Axios Request with JWT
        ↓
Express Route Handler
        ↓
Auth Middleware Validation
        ↓
Controller Logic
        ↓
Mongoose Query
        ↓
MongoDB Response
        ↓
Controller Response
        ↓
React State Update
        ↓
Component Re-render
```

---

## 🛠 Tech Stack

### Backend (Node.js)

| Technology | Version | Purpose |
|-----------|---------|---------|
| **Node.js** | v16+ | JavaScript runtime |
| **Express.js** | 4.x | Web framework & routing |
| **MongoDB** | 4.x+ | NoSQL database |
| **Mongoose** | 7.x | MongoDB ODM & validation |
| **JWT** | 9.x | Authentication tokens |
| **Bcrypt** | 5.x | Password hashing |
| **CORS** | 2.x | Cross-origin requests |
| **Dotenv** | 16.x | Environment variables |

### Frontend (React)

| Technology | Version | Purpose |
|-----------|---------|---------|
| **React** | 18.x | UI library |
| **Vite** | 4.x | Build tool & dev server |
| **Axios** | 1.x | HTTP client |
| **React Router** | 6.x | Client-side routing |
| **Lucide Icons** | Latest | Icon library |
| **CSS3** | Latest | Styling & animations |

### DevOps & Deployment

| Service | Tier | Purpose |
|---------|------|---------|
| **MongoDB Atlas** | M0 Free | Managed database |
| **Render** | Free | Backend hosting |
| **Vercel** | Free | Frontend hosting |

---

## 📁 Project Structure

```
team-task-manager/
│
├── 📄 README.md                          # This file
├── 📄 QUICKSTART.md                      # 30-minute setup guide
├── 📄 DEPLOYMENT.md                      # Production deployment
├── 📄 PROJECT_SUMMARY.md                 # Project overview
├── 📄 FILES_MANIFEST.txt                 # Complete file listing
│
├── 📁 backend/                           # Node.js + Express API
│   │
│   ├── 📄 server.js                      # Express server & CORS setup
│   ├── 📄 package.json                   # Dependencies
│   ├── 📄 .env.example                   # Environment template
│   ├── 📄 .gitignore                     # Git ignore rules
│   ├── 📄 render.yaml                    # Render deployment config
│   ├── 📄 README.md                      # Backend documentation
│   │
│   ├── 📁 models/                        # Mongoose schemas
│   │   ├── User.js                       # User model (auth, roles)
│   │   ├── Project.js                    # Project model (team management)
│   │   └── Task.js                       # Task model (CRUD + comments)
│   │
│   ├── 📁 controllers/                   # Business logic handlers
│   │   ├── authController.js             # Login, register, token refresh
│   │   ├── projectController.js          # Project CRUD & team management
│   │   └── taskController.js             # Task CRUD & comments
│   │
│   ├── 📁 routes/                        # API endpoint definitions
│   │   ├── auth.js                       # POST /auth/register, /login
│   │   ├── projects.js                   # GET/POST/PUT /projects
│   │   └── tasks.js                      # GET/POST/PUT /tasks
│   │
│   └── 📁 middleware/                    # Custom middleware
│       └── auth.js                       # JWT verification & role check
│
└── 📁 frontend/                          # React + Vite application
    │
    ├── 📄 index.html                     # HTML entry point
    ├── 📄 package.json                   # Dependencies
    ├── 📄 vite.config.js                 # Vite configuration
    ├── 📄 vercel.json                    # Vercel deployment config
    ├── 📄 .env.example                   # Environment template
    ├── 📄 .gitignore                     # Git ignore rules
    ├── 📄 README.md                      # Frontend documentation
    │
    └── 📁 src/                           # React source code
        │
        ├── 📄 main.jsx                   # React entry point
        ├── 📄 App.jsx                    # Main app component & routing
        ├── 📄 App.css                    # Global styles
        ├── 📄 api.js                     # Axios instance & API calls
        │
        ├── 📁 contexts/                  # State management
        │   ├── AuthContext.jsx           # Authentication state
        │   └── ProjectContext.jsx        # Project & task state
        │
        ├── 📁 components/                # Reusable components
        │   ├── Navigation.jsx            # Top navigation bar
        │   └── Navigation.css            # Navigation styles
        │
        └── 📁 pages/                     # Page components
            ├── Login.jsx                 # Login form page
            ├── Signup.jsx                # Registration form page
            ├── Dashboard.jsx             # Projects grid & overview
            ├── ProjectDetail.jsx         # Kanban board for tasks
            ├── Auth.css                  # Auth pages styling
            ├── Dashboard.css             # Dashboard styling
            └── ProjectDetail.css         # Kanban styling
```

**Total: 42+ files | ~184KB | Production Ready**

---

## 💾 Database Models

### User Schema

```javascript
{
  _id: ObjectId,
  
  // Profile Information
  name: String (required, min: 2, max: 50),
  email: String (required, unique, email validation),
  password: String (required, bcrypt hashed, min: 6),
  avatar: String (optional, URL),
  
  // Role & Permissions
  role: Enum['Admin', 'Member'] (default: 'Member'),
  
  // Relationships
  projects: [ObjectId] (references Project),
  createdProjects: [ObjectId] (projects owned by user),
  
  // Metadata
  createdAt: Date (auto, default: Date.now),
  updatedAt: Date (auto, default: Date.now),
  lastLogin: Date (optional)
}
```

**Validations:**
- Email must be unique and valid format
- Password must be 6+ characters
- Name must be 2-50 characters

---

### Project Schema

```javascript
{
  _id: ObjectId,
  
  // Project Information
  name: String (required, min: 3, max: 100),
  description: String (optional, max: 500),
  status: Enum['Active', 'On Hold', 'Completed'] (default: 'Active'),
  
  // Team Management
  owner: ObjectId (references User, required),
  members: [
    {
      userId: ObjectId (references User),
      role: Enum['Admin', 'Member'],
      joinedAt: Date
    }
  ],
  
  // Tasks
  tasks: [ObjectId] (references Task),
  
  // Metadata
  createdAt: Date (auto),
  updatedAt: Date (auto),
  dueDate: Date (optional)
}
```

**Indexes:**
- Unique: `{ owner, name }` (user can't have duplicate project names)
- Default: `{ createdAt: -1 }` (for sorting)

---

### Task Schema

```javascript
{
  _id: ObjectId,
  
  // Task Information
  title: String (required, min: 3, max: 200),
  description: String (optional, max: 2000),
  
  // Status & Priority
  status: Enum['Todo', 'In Progress', 'In Review', 'Completed'] 
          (default: 'Todo'),
  priority: Enum['Low', 'Medium', 'High'] (default: 'Medium'),
  
  // Assignment & Dates
  project: ObjectId (references Project, required),
  assignee: ObjectId (references User, optional),
  createdBy: ObjectId (references User, required),
  dueDate: Date (optional),
  
  // Comments
  comments: [
    {
      _id: ObjectId,
      author: ObjectId (references User),
      text: String,
      createdAt: Date
    }
  ],
  
  // Metadata
  createdAt: Date (auto),
  updatedAt: Date (auto),
  completedAt: Date (optional, auto-set when status = 'Completed')
}
```

**Indexes:**
- Default: `{ project: 1, createdAt: -1 }` (project tasks sorted by date)
- Default: `{ assignee: 1, status: 1 }` (user's tasks by status)

---

## 🔐 Role-Based Access Control

### Permission Matrix

| Feature | Admin | Member | Owner |
|---------|-------|--------|-------|
| **Projects** | | | |
| Create Project | ✅ | ✅ | - |
| Edit Own Project | ✅ | - | ✅ |
| Delete Own Project | ✅ | - | ✅ |
| View Project | ✅ | ✅ | ✅ |
| Add Members | ✅ | - | ✅ |
| Remove Members | ✅ | - | ✅ |
| Change Member Role | ✅ | - | ✅ |
| | | | |
| **Tasks** | | | |
| Create Task | ✅ | ✅ | ✅ |
| Edit Own Task | ✅ | ✅ | ✅ |
| Edit Any Task | ✅ | - | ✅ |
| Delete Own Task | ✅ | ✅ | ✅ |
| Delete Any Task | ✅ | - | ✅ |
| Assign Tasks | ✅ | - | ✅ |
| Change Status | ✅ | ✅* | ✅ |
| Add Comments | ✅ | ✅ | ✅ |
| | | | |
| **Users** | | | |
| View All Users | ✅ | - | - |
| Manage Roles | ✅ | - | - |

**Notes:**
- `*` Member can only change status of tasks assigned to them
- **Owner** - User who created the project (has full permissions for that project)
- **Admin** - User with Admin role (can manage any project they're member of)
- **Member** - Regular member with limited permissions

### Implementation Details

```javascript
// Middleware: Check if user has permission
const checkProjectAccess = async (req, res, next) => {
  const userId = req.user.id;
  const projectId = req.params.projectId;
  
  const project = await Project.findById(projectId);
  
  // Check if user is owner
  if (project.owner.toString() === userId) {
    return next();
  }
  
  // Check if user is member with admin role
  const member = project.members.find(m => 
    m.userId.toString() === userId && m.role === 'Admin'
  );
  
  if (member) {
    return next();
  }
  
  // Check if user is regular member (read-only)
  const isMember = project.members.some(m => 
    m.userId.toString() === userId
  );
  
  if (!isMember) {
    return res.status(403).json({ error: 'Not authorized' });
  }
  
  next();
};
```

---

## 📡 API Endpoints

### Authentication Endpoints

```
POST   /api/auth/register
       Body: { name, email, password }
       Response: { token, user: { id, name, email, role } }

POST   /api/auth/login
       Body: { email, password }
       Response: { token, user: { id, name, email, role } }

POST   /api/auth/refresh
       Headers: { Authorization: "Bearer token" }
       Response: { token }

GET    /api/auth/me
       Headers: { Authorization: "Bearer token" }
       Response: { user: { id, name, email, role, projects } }
```

### Project Endpoints

```
GET    /api/projects
       Headers: { Authorization: "Bearer token" }
       Response: [{ id, name, description, status, members, taskCount }]

POST   /api/projects
       Headers: { Authorization: "Bearer token" }
       Body: { name, description }
       Response: { id, name, description, owner, members, createdAt }

GET    /api/projects/:id
       Headers: { Authorization: "Bearer token" }
       Response: { id, name, description, owner, members, tasks, status }

PUT    /api/projects/:id
       Headers: { Authorization: "Bearer token" }
       Body: { name, description, status }
       Response: { id, name, description, status, updatedAt }

DELETE /api/projects/:id
       Headers: { Authorization: "Bearer token" }
       Response: { message: "Project deleted" }

POST   /api/projects/:id/members
       Headers: { Authorization: "Bearer token" }
       Body: { userId, role: 'Admin' | 'Member' }
       Response: { members: [{ userId, role, joinedAt }] }

DELETE /api/projects/:id/members/:userId
       Headers: { Authorization: "Bearer token" }
       Response: { members: [...] }

PUT    /api/projects/:id/members/:userId
       Headers: { Authorization: "Bearer token" }
       Body: { role: 'Admin' | 'Member' }
       Response: { members: [...] }
```

### Task Endpoints

```
GET    /api/tasks
       Query: ?project=id&status=todo&assignee=id
       Headers: { Authorization: "Bearer token" }
       Response: [{ id, title, status, priority, assignee, dueDate }]

POST   /api/tasks
       Headers: { Authorization: "Bearer token" }
       Body: { title, description, project, priority, dueDate, assignee }
       Response: { id, title, description, status, priority, createdAt }

GET    /api/tasks/:id
       Headers: { Authorization: "Bearer token" }
       Response: { id, title, description, status, priority, assignee, comments }

PUT    /api/tasks/:id
       Headers: { Authorization: "Bearer token" }
       Body: { title, description, status, priority, assignee, dueDate }
       Response: { id, title, status, priority, updatedAt }

DELETE /api/tasks/:id
       Headers: { Authorization: "Bearer token" }
       Response: { message: "Task deleted" }

POST   /api/tasks/:id/comments
       Headers: { Authorization: "Bearer token" }
       Body: { text }
       Response: { comments: [{ id, author, text, createdAt }] }

GET    /api/tasks/project/:projectId
       Query: ?status=&priority=&assignee=
       Headers: { Authorization: "Bearer token" }
       Response: [{ id, title, status, priority, assignee }]
```

### Error Responses

```
401 Unauthorized: { error: "Token invalid or expired" }
403 Forbidden: { error: "Not authorized to access this resource" }
404 Not Found: { error: "Resource not found" }
400 Bad Request: { error: "Validation error", details: [...] }
500 Server Error: { error: "Internal server error" }
```

---

## ⚙️ Installation & Setup

### Prerequisites

Before you begin, ensure you have:

- **Node.js** v16 or higher ([Download](https://nodejs.org/))
- **npm** or **yarn** package manager
- **MongoDB Atlas** account (free) ([Sign up](https://www.mongodb.com/cloud/atlas))
- **Git** for version control
- **Code Editor** (VS Code recommended)

### Clone Repository

```bash
# Clone the project
git clone https://github.com/yourusername/team-task-manager.git
cd team-task-manager
```

---

## 🚀 Quick Start (30 Minutes)

### Step 1: Backend Setup (10 minutes)

```bash
# Navigate to backend directory
cd backend

# Install dependencies
npm install

# Create environment file
cp .env.example .env
```

**Configure `.env` file:**

```env
# Server
NODE_ENV=development
PORT=5000

# Database
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/team-task-manager

# Authentication
JWT_SECRET=your_super_secret_jwt_key_here_change_in_production
JWT_EXPIRE=7d

# Frontend
FRONTEND_URL=http://localhost:5173

# Environment
ENVIRONMENT=development
```

**Get MongoDB URI:**
1. Go to [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. Create free account
3. Create a free M0 cluster
4. Click "Connect" → "Drivers"
5. Copy connection string
6. Replace `<username>` and `<password>`
7. Add `/team-task-manager` as database name

**Start Backend:**

```bash
npm run dev
# Output: Server running on port 5000 ✅
```

---

### Step 2: Frontend Setup (10 minutes)

**Open new terminal in project root:**

```bash
# Navigate to frontend directory
cd frontend

# Install dependencies
npm install

# Create environment file
cp .env.example .env
```

**Configure `.env` file:**

```env
VITE_API_URL=http://localhost:5000/api
```

**Start Frontend:**

```bash
npm run dev
# Output: Local: http://localhost:5173 ✅
```

---

### Step 3: Test Application (10 minutes)

**Open browser:** http://localhost:5173

**Test Flow:**

1. **Sign Up**
   - Click "Sign up" button
   - Enter: Name, Email, Password
   - Click "Sign up"
   - ✅ Redirected to dashboard

2. **Create Project**
   - Click "New Project"
   - Enter project name: "My First Project"
   - Click "Create"
   - ✅ Project appears in grid

3. **Add Tasks**
   - Click on project
   - Click "Add Task"
   - Enter title: "Setup project"
   - Select priority: "High"
   - Click "Create"

4. **Manage Tasks**
   - Drag task to "In Progress"
   - Add comment: "Working on this"
   - Change priority to "Medium"
   - ✅ See all updates in real-time

5. **Team Management** (if multiple users)
   - Go to project settings
   - Click "Add Member"
   - Enter email of another user
   - Set role: "Member"
   - ✅ Member can see project

---

## Common Setup Issues

### Issue: Backend won't start

**Error:** `MONGODB_URI not found`

**Solution:**
```bash
# Check .env file exists
cat .env

# Check variable is set
echo $MONGODB_URI

# Verify MongoDB connection
npm run test-db
```

### Issue: Frontend shows "Cannot reach API"

**Error:** `Error: Cannot reach API server`

**Solution:**
```bash
# 1. Verify backend is running
curl http://localhost:5000/api/health

# 2. Check VITE_API_URL in .env
cat frontend/.env

# 3. Clear browser cache (Ctrl+Shift+Delete)
# 4. Restart frontend dev server
npm run dev
```

### Issue: CORS errors in console

**Error:** `Access to XMLHttpRequest blocked by CORS`

**Solution:**
```javascript
// Check server.js has CORS enabled
app.use(cors({
  origin: process.env.FRONTEND_URL,
  credentials: true
}));

// Restart backend
npm run dev
```

---

## 🌐 Deployment (Free Tier)

Get your application live in **30 minutes** for **$0/month**!

### Architecture

```
┌──────────────┐
│   Vercel     │  Frontend (React)
│   (Free)     │
└──────┬───────┘
       │ HTTPS
┌──────▼───────┐
│   Render     │  Backend (Node.js)
│   (Free)     │
└──────┬───────┘
       │ MongoDB Protocol
┌──────▼───────────┐
│ MongoDB Atlas    │  Database
│ (512MB Free)     │
└──────────────────┘
```

### Part 1: Database (MongoDB Atlas) - 5 minutes

1. **Create Account**
   - Go to https://www.mongodb.com/cloud/atlas
   - Sign up (free tier)
   - Create organization

2. **Create Cluster**
   - Click "Create Deployment"
   - Select "M0 Free" (512MB, perfect for MVP)
   - Choose any cloud provider
   - Create cluster (wait 3-5 mins)

3. **Get Connection String**
   - Click "Database" → "Connect"
   - Choose "Drivers"
   - Copy connection string
   - Replace `<username>` and `<password>`
   - Add `/team-task-manager` to path
   
   Example: `mongodb+srv://user:pass@cluster.mongodb.net/team-task-manager`

4. **Configure Network Access**
   - Go to "Network Access"
   - Click "Add IP Address"
   - Select "Allow Access from Anywhere" (required for free tier)

### Part 2: Backend (Render) - 10 minutes

1. **Create Render Account**
   - Go to https://render.com
   - Sign up (free)
   - Connect GitHub account

2. **Deploy Backend**
   - Click "New" → "Web Service"
   - Select your GitHub repo
   - Configure:
     - **Name:** team-task-manager-api
     - **Environment:** Node
     - **Build Command:** `npm install`
     - **Start Command:** `npm start`
     - **Plan:** Free

3. **Add Environment Variables**
   ```
   MONGODB_URI = mongodb+srv://user:pass@cluster.mongodb.net/team-task-manager
   JWT_SECRET = GenerateRandomString123!@#
   NODE_ENV = production
   FRONTEND_URL = https://your-vercel-url.vercel.app (update later)
   ```

4. **Deploy**
   - Click "Create Web Service"
   - Wait 2-3 minutes
   - Copy your Render URL: `https://team-task-manager-api.onrender.com`

### Part 3: Frontend (Vercel) - 10 minutes

1. **Create Vercel Account**
   - Go to https://vercel.com
   - Sign up (free)
   - Connect GitHub account

2. **Deploy Frontend**
   - Click "New Project"
   - Select your GitHub repo
   - Configure:
     - **Framework:** Vite
     - **Build Command:** `npm run build`
     - **Output Directory:** `dist`

3. **Add Environment Variable**
   ```
   VITE_API_URL = https://team-task-manager-api.onrender.com/api
   ```

4. **Deploy**
   - Click "Deploy"
   - Wait 1-2 minutes
   - Your site is live! 🎉

### Part 4: Final Setup

1. **Update Backend FRONTEND_URL**
   - Go to Render dashboard
   - Find your Web Service
   - Environment → Edit Variables
   - Update `FRONTEND_URL` with your Vercel URL
   - Save & redeploy

2. **Test Production**
   - Open your Vercel URL
   - Sign up with new account
   - Create projects and tasks
   - Verify everything works

### Monitoring

**Render Backend:**
- Dashboard: https://dashboard.render.com
- View logs in real-time
- Monitor performance

**Vercel Frontend:**
- Dashboard: https://vercel.com/dashboard
- Check deployment status
- View analytics

**MongoDB Atlas:**
- Dashboard: https://cloud.mongodb.com
- Monitor collections
- Track usage

### Free Tier Limits

| Service | Free Tier | Limit |
|---------|-----------|-------|
| **Render** | 750 hours/month | ~24/7 uptime |
| **Vercel** | Unlimited deployments | Generous quota |
| **MongoDB** | 512MB storage | 100k ops/month |

**Perfect for MVP & small teams!**

---

## 📖 Complete File Manifest

### Backend Files (20 files)

**Core Configuration:**
- `server.js` - Express setup, CORS, middleware
- `package.json` - Dependencies & scripts
- `.env.example` - Environment template
- `.gitignore` - Git ignore rules
- `render.yaml` - Render deployment config
- `README.md` - Backend API docs

**Models (3 files):**
- `models/User.js` - User schema with auth
- `models/Project.js` - Project with team management
- `models/Task.js` - Task with comments

**Controllers (3 files):**
- `controllers/authController.js` - Registration, login, tokens
- `controllers/projectController.js` - Project CRUD & members
- `controllers/taskController.js` - Task CRUD & comments

**Routes (3 files):**
- `routes/auth.js` - Auth endpoints
- `routes/projects.js` - Project endpoints
- `routes/tasks.js` - Task endpoints

**Middleware (1 file):**
- `middleware/auth.js` - JWT verification & role checking

### Frontend Files (15+ files)

**Configuration:**
- `index.html` - HTML entry point
- `package.json` - Dependencies
- `vite.config.js` - Vite configuration
- `vercel.json` - Vercel deployment
- `.env.example` - Environment template
- `.gitignore` - Git ignore rules
- `README.md` - Frontend docs

**Source Code:**
- `src/main.jsx` - React bootstrap
- `src/App.jsx` - Main app & routing
- `src/App.css` - Global styles
- `src/api.js` - Axios instance & API calls

**Contexts (2 files):**
- `src/contexts/AuthContext.jsx` - Auth state management
- `src/contexts/ProjectContext.jsx` - Project state management

**Components (2 files):**
- `src/components/Navigation.jsx` - Navigation bar
- `src/components/Navigation.css` - Nav styles

**Pages (7 files):**
- `src/pages/Login.jsx` - Login form
- `src/pages/Signup.jsx` - Registration form
- `src/pages/Dashboard.jsx` - Projects grid
- `src/pages/ProjectDetail.jsx` - Kanban board
- `src/pages/Auth.css` - Auth styling
- `src/pages/Dashboard.css` - Dashboard styling
- `src/pages/ProjectDetail.css` - Kanban styling

### Documentation Files (5 files)

- `README.md` - This comprehensive guide
- `QUICKSTART.md` - 30-minute setup
- `DEPLOYMENT.md` - Free tier deployment
- `PROJECT_SUMMARY.md` - Project overview
- `FILES_MANIFEST.txt` - File listing

**Total: 42+ files | ~184KB | Production Ready**

---

## 📊 Features Checklist

### ✅ Authentication & Security
- [x] User registration with validation
- [x] User login with JWT
- [x] Password hashing with Bcrypt
- [x] Protected API routes
- [x] Token refresh mechanism
- [x] Role-based access control
- [x] CORS protection

### ✅ Project Management
- [x] Create projects
- [x] Edit project details
- [x] Delete projects
- [x] List user's projects
- [x] Add team members
- [x] Remove team members
- [x] Change member roles
- [x] Project status tracking

### ✅ Task Management
- [x] Create tasks
- [x] Update task details
- [x] Delete tasks
- [x] Change task status
- [x] Set task priority
- [x] Assign tasks to members
- [x] Set due dates
- [x] Track overdue tasks
- [x] Add comments to tasks
- [x] Filter tasks by status/priority

### ✅ User Experience
- [x] Responsive design
- [x] Professional UI
- [x] Real-time updates
- [x] Error handling
- [x] Loading states
- [x] Navigation
- [x] Icon library
- [x] Form validation

### ✅ Developer Experience
- [x] Complete documentation
- [x] Environment configuration
- [x] Proper project structure
- [x] Clean code practices
- [x] Error handling
- [x] API documentation
- [x] Deployment guide
- [x] Development scripts

---

## 🤝 Contributing

Contributions are welcome! Here's how:

1. **Fork** the repository
2. **Create** a feature branch (`git checkout -b feature/AmazingFeature`)
3. **Commit** your changes (`git commit -m 'Add AmazingFeature'`)
4. **Push** to the branch (`git push origin feature/AmazingFeature`)
5. **Open** a Pull Request

### Development Guidelines

- Follow existing code style
- Add tests for new features
- Update documentation
- Keep commits atomic
- Write descriptive commit messages

---

## 📚 Additional Resources

### Learning Resources
- [MERN Stack Tutorial](https://mern.io/)
- [MongoDB Documentation](https://docs.mongodb.com/)
- [Express.js Guide](https://expressjs.com/)
- [React Official Docs](https://react.dev/)
- [Vite Documentation](https://vitejs.dev/)

### Tools & Services
- [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
- [Render Deployment](https://render.com/)
- [Vercel Hosting](https://vercel.com/)
- [VS Code Editor](https://code.visualstudio.com/)

### Useful Commands

**Backend Development:**
```bash
npm run dev          # Start development server
npm start            # Start production server
npm test             # Run tests (if configured)
npm run lint         # Check code style
```

**Frontend Development:**
```bash
npm run dev          # Start development server
npm run build        # Build for production
npm run preview      # Preview production build
npm run lint         # Check code style
```

---

## 🐛 Troubleshooting

### Database Connection Issues

**Problem:** `MongoNetworkError: connect ECONNREFUSED`

**Solution:**
1. Check MongoDB URI in `.env`
2. Verify cluster is running in MongoDB Atlas
3. Check IP whitelist in Network Access
4. Try: `mongodb+srv://user:password@cluster.mongodb.net/team-task-manager`

### CORS Errors

**Problem:** `Access to XMLHttpRequest blocked by CORS`

**Solution:**
1. Check FRONTEND_URL in backend `.env`
2. Restart backend: `npm run dev`
3. Clear browser cache (Ctrl+Shift+Delete)
4. Check `server.js` has CORS enabled

### Port Already in Use

**Problem:** `Error: Port 5000 already in use`

**Solution:**
```bash
# Kill process on port 5000
lsof -i :5000
kill -9 <PID>

# Or use different port
PORT=5001 npm run dev
```

### Authentication Token Issues

**Problem:** `401 Unauthorized` on all requests

**Solution:**
1. Sign up/login again to get new token
2. Check token in localStorage
3. Clear localStorage: `localStorage.clear()`
4. Check JWT_SECRET is set in backend

---

## 📄 License

This project is licensed under the **MIT License** - see the LICENSE file for details.

---

## 👨‍💻 Author

**Your Name/Team**
- GitHub: [@yourusername](https://github.com/yourusername)
- Email: your.email@example.com

---

## 🙏 Acknowledgments

- MongoDB Atlas for free database hosting
- Render for free backend hosting
- Vercel for free frontend hosting
- React team for amazing library
- Express.js community
- All contributors and testers

---

## 📞 Support

Need help? 

- 📖 Check [QUICKSTART.md](./QUICKSTART.md) for setup help
- 🚀 See [DEPLOYMENT.md](./DEPLOYMENT.md) for deployment issues
- 🐛 Open an issue on GitHub
- 💬 Email: support@example.com

---

## 🚀 Next Steps

1. **Read [QUICKSTART.md](./QUICKSTART.md)** - Get running in 30 minutes
2. **Follow [DEPLOYMENT.md](./DEPLOYMENT.md)** - Deploy for free
3. **Explore the Code** - Understand the architecture
4. **Customize** - Add your own branding
5. **Extend** - Add more features
6. **Share** - Tell your team about it!

---

## ⭐ Show Your Support

If this project helped you, please consider:
- Giving it a ⭐ star on GitHub
- Sharing it with your team
- Contributing improvements
- Reporting bugs

---

**Happy coding! 🎉**

*Made with ❤️ for developers who want production-ready applications*

---

**Last Updated:** May 2026  
**Version:** 1.0.0  
**Status:** Production Ready ✅