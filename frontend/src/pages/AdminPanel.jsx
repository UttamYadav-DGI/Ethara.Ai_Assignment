import React, { useState, useEffect } from 'react';
import { adminAPI } from '../api';
import './AdminPanel.css';

export const AdminPanel = () => {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [stats, setStats] = useState(null);
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchDashboardStats();
    fetchUsers();
  }, []);

  const fetchDashboardStats = async () => {
    try {
      setLoading(true);
      const res = await adminAPI.getDashboardStats();
      setStats(res.data.stats);
      setError(null);
    } catch (err) {
      setError('Failed to fetch dashboard stats');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const fetchUsers = async () => {
    try {
      setLoading(true);
      const res = await adminAPI.getAllUsers();
      setUsers(res.data.users);
      setError(null);
    } catch (err) {
      setError('Failed to fetch users');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleUpdateRole = async (userId, newRole) => {
    try {
      await adminAPI.updateUserRole({ userId, role: newRole });
      fetchUsers();
    } catch (err) {
      setError('Failed to update user role');
      console.error(err);
    }
  };

  const handleDeleteUser = async (userId) => {
    if (window.confirm('Are you sure you want to delete this user?')) {
      try {
        await adminAPI.deleteUser({ userId });
        fetchUsers();
      } catch (err) {
        setError('Failed to delete user');
        console.error(err);
      }
    }
  };

  return (
    <div className="admin-panel">
      <h1>Admin Dashboard</h1>

      <div className="admin-tabs">
        <button
          className={`tab-btn ${activeTab === 'dashboard' ? 'active' : ''}`}
          onClick={() => setActiveTab('dashboard')}
        >
          Dashboard
        </button>
        <button
          className={`tab-btn ${activeTab === 'users' ? 'active' : ''}`}
          onClick={() => setActiveTab('users')}
        >
          User Management
        </button>
      </div>

      {error && <div className="error-message">{error}</div>}

      {activeTab === 'dashboard' && (
        <div className="dashboard-section">
          {loading ? (
            <div className="loading">Loading statistics...</div>
          ) : stats ? (
            <div className="stats-grid">
              <div className="stat-card">
                <h3>Total Users</h3>
                <p className="stat-number">{stats.users.total}</p>
                <div className="stat-breakdown">
                  <span>Admins: {stats.users.admin}</span>
                  <span>Members: {stats.users.member}</span>
                </div>
              </div>

              <div className="stat-card">
                <h3>Total Projects</h3>
                <p className="stat-number">{stats.projects.total}</p>
                <div className="stat-breakdown">
                  <span>Active: {stats.projects.active}</span>
                  <span>Completed: {stats.projects.completed}</span>
                </div>
              </div>

              <div className="stat-card">
                <h3>Total Tasks</h3>
                <p className="stat-number">{stats.tasks.total}</p>
                <div className="stat-breakdown">
                  <span>Completed: {stats.tasks.completed}</span>
                  <span>Overdue: {stats.tasks.overdue}</span>
                </div>
              </div>

              <div className="stat-card">
                <h3>Overdue Tasks</h3>
                <p className={`stat-number ${stats.tasks.overdue > 0 ? 'warning' : ''}`}>
                  {stats.tasks.overdue}
                </p>
              </div>
            </div>
          ) : (
            <div>No data available</div>
          )}
        </div>
      )}

      {activeTab === 'users' && (
        <div className="users-section">
          <h2>User Management</h2>
          {loading ? (
            <div className="loading">Loading users...</div>
          ) : (
            <div className="users-table">
              <table>
                <thead>
                  <tr>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Role</th>
                    <th>Joined</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {users.map(user => (
                    <tr key={user._id}>
                      <td>{user.name}</td>
                      <td>{user.email}</td>
                      <td>
                        <select
                          value={user.role}
                          onChange={(e) => handleUpdateRole(user._id, e.target.value)}
                          className="role-select"
                        >
                          <option value="member">Member</option>
                          <option value="admin">Admin</option>
                        </select>
                      </td>
                      <td>{new Date(user.createdAt).toLocaleDateString()}</td>
                      <td>
                        <button
                          className="delete-btn"
                          onClick={() => handleDeleteUser(user._id)}
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
