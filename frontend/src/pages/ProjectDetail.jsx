import React, { useEffect, useState } from 'react';
import { useProjects } from '../contexts/ProjectContext';
import { Plus, Trash2, Edit2, ChevronLeft } from 'lucide-react';
import './ProjectDetail.css';

export const ProjectDetail = ({ setCurrentPage }) => {
  const { currentProject, tasks, fetchProject, fetchTasks, createTask, updateTask, deleteTask } = useProjects();
  const [projectId, setProjectId] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({ title: '', description: '', priority: 'medium' });

  useEffect(() => {
    const id = localStorage.getItem('currentProjectId');
    if (id) {
      setProjectId(id);
      fetchProject(id);
      fetchTasks(id);
    }
  }, []);

  const handleCreateTask = async (e) => {
    e.preventDefault();
    if (projectId) {
      try {
        await createTask(projectId, formData.title, formData.description, formData.priority);
        setFormData({ title: '', description: '', priority: 'medium' });
        setShowForm(false);
      } catch (error) {
        console.error('Failed to create task');
      }
    }
  };

  const handleStatusChange = (taskId, newStatus) => {
    updateTask(taskId, { status: newStatus });
  };

  if (!currentProject) {
    return (
      <div className="loading">
        <p>Loading project...</p>
      </div>
    );
  }

  return (
    <div className="project-detail">
      <div className="detail-header">
        <button className="back-btn" onClick={() => setCurrentPage('dashboard')}>
          <ChevronLeft size={20} /> Back
        </button>
        <div>
          <h1>{currentProject.name}</h1>
          <p>{currentProject.description}</p>
        </div>
      </div>

      <div className="detail-actions">
        <button className="btn-primary" onClick={() => setShowForm(!showForm)}>
          <Plus size={20} /> Add Task
        </button>
      </div>

      {showForm && (
        <div className="card task-form">
          <h3>Create New Task</h3>
          <form onSubmit={handleCreateTask}>
            <div className="form-group">
              <input
                type="text"
                placeholder="Task title"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                required
              />
            </div>
            <div className="form-group">
              <textarea
                placeholder="Description (optional)"
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              />
            </div>
            <div className="form-group">
              <select
                value={formData.priority}
                onChange={(e) => setFormData({ ...formData, priority: e.target.value })}
              >
                <option value="low">Low Priority</option>
                <option value="medium">Medium Priority</option>
                <option value="high">High Priority</option>
              </select>
            </div>
            <div className="form-actions">
              <button type="submit" className="btn-primary">Create Task</button>
              <button type="button" className="btn-secondary" onClick={() => setShowForm(false)}>
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}

      <div className="tasks-container">
        <div className="task-column">
          <h3>📝 To Do</h3>
          <div className="task-list">
            {tasks.filter(t => t.status === 'todo').map(task => (
              <TaskCard
                key={task._id}
                task={task}
                onStatusChange={handleStatusChange}
                onDelete={deleteTask}
                setCurrentPage={setCurrentPage}
              />
            ))}
          </div>
        </div>

        <div className="task-column">
          <h3>⚙️ In Progress</h3>
          <div className="task-list">
            {tasks.filter(t => t.status === 'in-progress').map(task => (
              <TaskCard
                key={task._id}
                task={task}
                onStatusChange={handleStatusChange}
                onDelete={deleteTask}
                setCurrentPage={setCurrentPage}
              />
            ))}
          </div>
        </div>

        <div className="task-column">
          <h3>👀 Review</h3>
          <div className="task-list">
            {tasks.filter(t => t.status === 'review').map(task => (
              <TaskCard
                key={task._id}
                task={task}
                onStatusChange={handleStatusChange}
                onDelete={deleteTask}
                setCurrentPage={setCurrentPage}
              />
            ))}
          </div>
        </div>

        <div className="task-column">
          <h3>✅ Completed</h3>
          <div className="task-list">
            {tasks.filter(t => t.status === 'completed').map(task => (
              <TaskCard
                key={task._id}
                task={task}
                onStatusChange={handleStatusChange}
                onDelete={deleteTask}
                setCurrentPage={setCurrentPage}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

const TaskCard = ({ task, onStatusChange, onDelete, setCurrentPage }) => {
  const statuses = ['todo', 'in-progress', 'review', 'completed'];
  const statusLabels = {
    'todo': '📝 To Do',
    'in-progress': '⚙️ In Progress',
    'review': '👀 Review',
    'completed': '✅ Completed'
  };

  const priorityColors = {
    low: '#28a745',
    medium: '#ffc107',
    high: '#dc3545'
  };

  return (
    <div className="task-card">
      <div className="task-header">
        <h4>{task.title}</h4>
        <button
          className="delete-btn"
          onClick={() => onDelete(task._id)}
          title="Delete task"
        >
          <Trash2 size={16} />
        </button>
      </div>

      {task.description && (
        <p className="task-description">{task.description}</p>
      )}

      <div className="task-meta">
        <span
          className="priority-badge"
          style={{ backgroundColor: priorityColors[task.priority] }}
        >
          {task.priority}
        </span>
      </div>

      <div className="task-actions">
        <select
          className="status-select"
          value={task.status}
          onChange={(e) => onStatusChange(task._id, e.target.value)}
        >
          {statuses.map(status => (
            <option key={status} value={status}>
              {statusLabels[status]}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
};
