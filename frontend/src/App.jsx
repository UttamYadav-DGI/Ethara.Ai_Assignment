import React, { useState } from 'react';
import { useAuth } from './contexts/AuthContext';
import { Navigation } from './components/Navigation';
import { Login } from './pages/Login';
import { Signup } from './pages/Signup';
import { Dashboard } from './pages/Dashboard';
import { ProjectDetail } from './pages/ProjectDetail';
import { AdminPanel } from './pages/AdminPanel';
import './App.css';

function App() {
  const { user, loading } = useAuth();
  const [currentPage, setCurrentPage] = useState('dashboard');

  if (loading) {
    return (
      <div className="loading-screen">
        <div className="spinner"></div>
        <p>Loading...</p>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="app">
        {currentPage === 'login' ? (
          <Login setCurrentPage={setCurrentPage} />
        ) : (
          <Signup setCurrentPage={setCurrentPage} />
        )}
      </div>
    );
  }

  return (
    <div className="app">
      <Navigation currentPage={currentPage} setCurrentPage={setCurrentPage} />
      <main className="main-content">
        {currentPage === 'dashboard' && <Dashboard setCurrentPage={setCurrentPage} />}
        {currentPage === 'project-detail' && <ProjectDetail setCurrentPage={setCurrentPage} />}
        {currentPage === 'admin' && user.role === 'admin' && <AdminPanel />}
      </main>
    </div>
  );
}

export default App;