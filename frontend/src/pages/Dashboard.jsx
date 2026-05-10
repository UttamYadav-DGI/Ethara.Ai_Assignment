import React, { useEffect, useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { useProjects } from '../contexts/ProjectContext';
import { Plus, Loader } from 'lucide-react';
import './Dashboard.css';

export const Dashboard = ({ setCurrentPage }) => {
  const { user } = useAuth();
  const { projects, fetchProjects, createProject, loading } = useProjects();
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({ name: '', description: '' });

  useEffect(() => {
    fetchProjects();
  }, []);

  const handleCreateProject = async (e) => {
    e.preventDefault();
    try {
      await createProject(formData.name, formData.description);
      setFormData({ name: '', description: '' });
      setShowForm(false);
    } catch (error) {
      console.error('Failed to create project');
    }
  };

  return (
    <div className="dashboard">
      <div className="dashboard-header">
        <div>
          <h1>Welcome, {user?.name}! 👋</h1>
          <p>Here's your project overview</p>
        </div>
        <button className="btn-primary btn-lg" onClick={() => setShowForm(!showForm)}>
          <Plus size={20} /> New Project
        </button>
      </div>

      {showForm && (
        <div className="card new-project-form">
          <h3>Create New Project</h3>
          <form onSubmit={handleCreateProject}>
            <div className="form-group">
              <input
                type="text"
                placeholder="Project name"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                required
              />
            </div>
            <div className="form-group">
              <textarea
                placeholder="Project description (optional)"
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              />
            </div>
            <div className="form-actions">
              <button type="submit" className="btn-primary">Create</button>
              <button
                type="button"
                className="btn-secondary"
                onClick={() => setShowForm(false)}
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}

      <div className="dashboard-content">
        {loading && (
          <div className="loading">
            <Loader className="spinner" size={40} />
            <p>Loading projects...</p>
          </div>
        )}

        {!loading && projects.length === 0 && (
          <div className="empty-state">
            <div className="empty-icon">📭</div>
            <h2>No projects yet</h2>
            <p>Create your first project to get started!</p>
            <button className="btn-primary" onClick={() => setShowForm(true)}>
              Create Project
            </button>
          </div>
        )}

        <div className="projects-grid">
          {projects.map(project => (
            <div
              key={project._id}
              className="card project-card"
              onClick={() => {
                localStorage.setItem('currentProjectId', project._id);
                setCurrentPage('project-detail');
              }}
            >
              <div className="project-header">
                <h3>{project.name}</h3>
                <span className={`status-badge ${project.status}`}>{project.status}</span>
              </div>
              <p className="project-description">{project.description || 'No description'}</p>
              <div className="project-footer">
                <div className="members-preview">
                  {project.members.slice(0, 3).map((member, idx) => (
                    <div key={idx} className="member-avatar" title={member.name}>
                      {member.name.charAt(0).toUpperCase()}
                    </div>
                  ))}
                  {project.members.length > 3 && (
                    <div className="member-avatar">+{project.members.length - 3}</div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
