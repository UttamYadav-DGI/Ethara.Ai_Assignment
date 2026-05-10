# Team Task Manager - Backend

Express.js + MongoDB backend for the Team Task Manager application.

## Setup

1. Install dependencies:
```bash
npm install
```

2. Create `.env` file from `.env.example`:
```bash
cp .env.example .env
```

3. Update `.env` with your MongoDB URI and JWT secret:
```
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/team-task-manager
JWT_SECRET=your_secret_key_here
PORT=5000
FRONTEND_URL=http://localhost:5173
```

4. Run the server:
```bash
npm run dev
```

## API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user
- `GET /api/auth/me` - Get current user (protected)

### Projects
- `POST /api/projects` - Create project
- `GET /api/projects` - Get all user projects
- `GET /api/projects/:id` - Get project details
- `PUT /api/projects/:id` - Update project
- `DELETE /api/projects/:id` - Delete project
- `POST /api/projects/:id/members` - Add member to project

### Tasks
- `POST /api/tasks/project/:projectId` - Create task
- `GET /api/tasks/project/:projectId` - Get project tasks
- `GET /api/tasks/:id` - Get task details
- `PUT /api/tasks/:id` - Update task
- `DELETE /api/tasks/:id` - Delete task
- `POST /api/tasks/:id/comments` - Add comment to task

## Database Models

### User
- name, email, password, role, avatar, createdAt

### Project
- name, description, owner, members, status, createdAt, updatedAt

### Task
- title, description, project, assignee, priority, status, dueDate, comments, createdAt, updatedAt
