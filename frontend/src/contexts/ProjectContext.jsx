import React, { createContext, useContext, useState } from 'react';
import { projectAPI, taskAPI } from '../api.js';

const ProjectContext = createContext();

export const ProjectProvider = ({ children }) => {
  const [projects, setProjects] = useState([]);
  const [currentProject, setCurrentProject] = useState(null);
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchProjects = async () => {
    try {
      setLoading(true);
      const res = await projectAPI.getProjects();
      setProjects(res.data.projects);
      setError(null);
    } catch (err) {
      setError('Failed to fetch projects');
    } finally {
      setLoading(false);
    }
  };

  const fetchProject = async (id) => {
    try {
      setLoading(true);
      const res = await projectAPI.getProject(id);
      setCurrentProject(res.data.project);
      setError(null);
    } catch (err) {
      setError('Failed to fetch project');
    } finally {
      setLoading(false);
    }
  };

  const fetchTasks = async (projectId) => {
    try {
      setLoading(true);
      const res = await taskAPI.getProjectTasks(projectId);
      setTasks(res.data.tasks);
      setError(null);
    } catch (err) {
      setError('Failed to fetch tasks');
    } finally {
      setLoading(false);
    }
  };

  const createProject = async (name, description) => {
    try {
      const res = await projectAPI.createProject({
        name,
        description
      });
      setProjects([res.data.project, ...projects]);
      setError(null);
      return res.data.project;
    } catch (err) {
      setError('Failed to create project');
      throw err;
    }
  };

  const updateProject = async (id, data) => {
    try {
      const res = await projectAPI.updateProject(id, data);
      setProjects(projects.map(p => p._id === id ? res.data.project : p));
      if (currentProject?._id === id) {
        setCurrentProject(res.data.project);
      }
      setError(null);
      return res.data.project;
    } catch (err) {
      setError('Failed to update project');
      throw err;
    }
  };

  const deleteProject = async (id) => {
    try {
      await projectAPI.deleteProject(id);
      setProjects(projects.filter(p => p._id !== id));
      setError(null);
    } catch (err) {
      setError('Failed to delete project');
      throw err;
    }
  };

  const addMember = async (projectId, userId, role = 'member') => {
    try {
      const res = await projectAPI.addMember(projectId, { userId, role });
      setProjects(projects.map(p => p._id === projectId ? res.data.project : p));
      if (currentProject?._id === projectId) {
        setCurrentProject(res.data.project);
      }
      setError(null);
      return res.data.project;
    } catch (err) {
      setError('Failed to add member');
      throw err;
    }
  };

  const removeMember = async (projectId, memberId) => {
    try {
      const res = await projectAPI.removeMember(projectId, { memberId });
      setProjects(projects.map(p => p._id === projectId ? res.data.project : p));
      if (currentProject?._id === projectId) {
        setCurrentProject(res.data.project);
      }
      setError(null);
      return res.data.project;
    } catch (err) {
      setError('Failed to remove member');
      throw err;
    }
  };

  const updateMemberRole = async (projectId, memberId, role) => {
    try {
      const res = await projectAPI.updateMemberRole(projectId, { memberId, role });
      setProjects(projects.map(p => p._id === projectId ? res.data.project : p));
      if (currentProject?._id === projectId) {
        setCurrentProject(res.data.project);
      }
      setError(null);
      return res.data.project;
    } catch (err) {
      setError('Failed to update member role');
      throw err;
    }
  };

  const createTask = async (projectId, title, description, priority, dueDate) => {
    try {
      const res = await taskAPI.createTask(projectId, {
        title,
        description,
        priority,
        dueDate
      });
      setTasks([res.data.task, ...tasks]);
      setError(null);
      return res.data.task;
    } catch (err) {
      setError('Failed to create task');
      throw err;
    }
  };

  const updateTask = async (id, data) => {
    try {
      const res = await taskAPI.updateTask(id, data);
      setTasks(tasks.map(t => t._id === id ? res.data.task : t));
      setError(null);
      return res.data.task;
    } catch (err) {
      setError('Failed to update task');
      throw err;
    }
  };

  const deleteTask = async (id) => {
    try {
      await taskAPI.deleteTask(id);
      setTasks(tasks.filter(t => t._id !== id));
      setError(null);
    } catch (err) {
      setError('Failed to delete task');
      throw err;
    }
  };

  const addComment = async (taskId, text) => {
    try {
      const res = await taskAPI.addComment(taskId, { text });
      setTasks(tasks.map(t => t._id === taskId ? res.data.task : t));
      setError(null);
      return res.data.task;
    } catch (err) {
      setError('Failed to add comment');
      throw err;
    }
  };

  return (
    <ProjectContext.Provider
      value={{
        projects,
        currentProject,
        tasks,
        loading,
        error,
        fetchProjects,
        fetchProject,
        fetchTasks,
        createProject,
        updateProject,
        deleteProject,
        addMember,
        removeMember,
        updateMemberRole,
        createTask,
        updateTask,
        deleteTask,
        addComment
      }}
    >
      {children}
    </ProjectContext.Provider>
  );
};

export const useProjects = () => useContext(ProjectContext);