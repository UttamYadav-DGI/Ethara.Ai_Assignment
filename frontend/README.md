# Team Task Manager - Frontend

React 18 + Vite frontend for the Team Task Manager application.

## Setup

1. Install dependencies:
```bash
npm install
```

2. Create `.env` file from `.env.example`:
```bash
cp .env.example .env
```

3. Update `.env` with your API URL:
```
VITE_API_URL=http://localhost:5000/api
```

4. Run the development server:
```bash
npm run dev
```

Server will be available at `http://localhost:5173`

## Build

```bash
npm run build
```

Output will be in the `dist/` directory.

## Features

- User authentication (Login/Signup)
- Dashboard with project overview
- Create and manage projects
- Kanban board with task management
- Real-time task status updates
- Responsive design
- Context API for state management

## Pages

- **Login** - User authentication
- **Signup** - New user registration
- **Dashboard** - Project overview and creation
- **Project Detail** - Kanban board with tasks

## Components

- **Navigation** - Main navigation bar
- **Auth Pages** - Login and Signup forms
- **Dashboard** - Project listing and creation
- **ProjectDetail** - Kanban board implementation
