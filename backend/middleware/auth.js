import jwt from 'jsonwebtoken';
import Project from '../models/Project.js';
import Task from '../models/Task.js';

export const protect = (req, res, next) => {
  let token;

  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    token = req.headers.authorization.split(' ')[1];
  }

  if (!token) {
    return res.status(401).json({ success: false, message: 'Not authorized to access this route' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (error) {
    return res.status(401).json({ success: false, message: 'Not authorized to access this route' });
  }
};

export const authorize = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return res.status(403).json({ success: false, message: 'User role is not authorized to access this route' });
    }
    next();
  };
};

export const isProjectOwner = async (req, res, next) => {
  try {
    const project = await Project.findById(req.params.id);
    if (!project) {
      return res.status(404).json({ success: false, message: 'Project not found' });
    }

    if (project.owner.toString() !== req.user.id && req.user.role !== 'admin') {
      return res.status(403).json({ success: false, message: 'Not authorized to access this project' });
    }

    req.project = project;
    next();
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const isProjectMember = async (req, res, next) => {
  try {
    const project = await Project.findById(req.params.id);
    if (!project) {
      return res.status(404).json({ success: false, message: 'Project not found' });
    }

    const isMember = project.members.includes(req.user.id) || 
                     project.owner.toString() === req.user.id ||
                     req.user.role === 'admin';

    if (!isMember) {
      return res.status(403).json({ success: false, message: 'Not a member of this project' });
    }

    req.project = project;
    next();
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const isTaskAuthorized = async (req, res, next) => {
  try {
    const task = await Task.findById(req.params.id).populate('project');
    if (!task) {
      return res.status(404).json({ success: false, message: 'Task not found' });
    }

    const project = task.project;
    const isMember = project.members.includes(req.user.id) || 
                     project.owner.toString() === req.user.id ||
                     req.user.role === 'admin';

    if (!isMember) {
      return res.status(403).json({ success: false, message: 'Not authorized to access this task' });
    }

    req.task = task;
    req.project = project;
    next();
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
