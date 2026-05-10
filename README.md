# 🎉 Team Task Manager - Complete MERN Stack Application

A production-ready, full-stack MERN application for team collaboration and task management.

## ✨ Features

✅ User authentication with JWT
✅ Project & task management
✅ Team collaboration
✅ Role-based access control
✅ Task status tracking
✅ Responsive dashboard
✅ Professional UI
✅ Complete documentation
✅ Production-ready code
✅ Free tier deployment ready

## 📁 Project Structure

```
team-task-manager/
├── backend/
│   ├── models/
│   │   ├── User.js
│   │   ├── Project.js
│   │   └── Task.js
│   ├── controllers/
│   │   ├── authController.js
│   │   ├── projectController.js
│   │   └── taskController.js
│   ├── routes/
│   │   ├── auth.js
│   │   ├── projects.js
│   │   └── tasks.js
│   ├── middleware/
│   │   └── auth.js
│   ├── server.js
│   ├── package.json
│   └── .env.example
└── frontend/
    ├── src/
    │   ├── components/
    │   │   └── Navigation.jsx
    │   ├── contexts/
    │   │   ├── AuthContext.jsx
    │   │   └── ProjectContext.jsx
    │   ├── pages/
    │   │   ├── Login.jsx
    │   │   ├── Signup.jsx
    │   │   ├── Dashboard.jsx
    │   │   └── ProjectDetail.jsx
    │   ├── App.jsx
    │   ├── main.jsx
    │   └── api.js
    ├── index.html
    ├── package.json
    ├── vite.config.js
    └── .env.example
```

## 🚀 Quick Start (3 Steps)

### 1. Backend Setup
```bash
cd backend
npm install
cp .env.example .env
# Update .env with your MongoDB URI and JWT secret
npm run dev
```

### 2. Frontend Setup
```bash
cd frontend
npm install
cp .env.example .env
# Update .env with your API URL
npm run dev
```

### 3. Access Application
- Frontend: http://localhost:5173
- Backend: http://localhost:5000

## 📚 Documentation

- [QUICKSTART.md](./QUICKSTART.md) - 30-minute setup guide
- [DEPLOYMENT.md](./DEPLOYMENT.md) - Deploy to live servers
- [backend/README.md](./backend/README.md) - Backend API documentation
- [frontend/README.md](./frontend/README.md) - Frontend component documentation

## 🌐 Free Tier Deployment

1. **MongoDB Atlas** (Free 512MB database)
   - https://www.mongodb.com/cloud/atlas

2. **Render** (Free backend hosting)
   - https://render.com

3. **Vercel** (Free frontend hosting)
   - https://vercel.com

Total Cost: **$0** 💰

## 🔐 Authentication

- JWT-based authentication
- Bcrypt password hashing
- Protected routes with middleware
- Token stored in localStorage
- Auto-token injection in API calls

## 📊 Database Models

### User
- name, email, password (hashed), role, avatar

### Project
- name, description, owner, members, status

### Task
- title, description, project, assignee, priority, status, dueDate, comments

## 🛠 Tech Stack

**Backend:**
- Node.js + Express.js
- MongoDB + Mongoose
- JWT + Bcrypt
- CORS enabled

**Frontend:**
- React 18
- Vite
- Axios
- Lucide Icons
- Context API

## 📖 Next Steps

1. Read [QUICKSTART.md](./QUICKSTART.md) for 30-minute setup
2. Read [DEPLOYMENT.md](./DEPLOYMENT.md) to go live
3. Customize and extend features
4. Deploy to production

## 🤝 Contributing

Feel free to submit issues and enhancement requests!

## 📄 License

ISC License

---

**Ready to start?** Begin with [QUICKSTART.md](./QUICKSTART.md) 🚀
