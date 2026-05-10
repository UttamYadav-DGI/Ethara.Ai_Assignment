import Task from '../models/Task.js';
import Project from '../models/Project.js';

export const createTask = async (req, res) => {
  try {
    const { title, description, priority, dueDate, assignee } = req.body;
    const { projectId } = req.params;

    if (!title) {
      return res.status(400).json({ success: false, message: 'Please provide a task title' });
    }

    const project = await Project.findById(projectId);
    if (!project) {
      return res.status(404).json({ success: false, message: 'Project not found' });
    }

    // Check if user is project member or owner
    const isOwner = project.owner.toString() === req.user.id;
    const isMember = project.members.some(m => m.userId.toString() === req.user.id);
    const isAdmin = req.user.role === 'admin';

    if (!isOwner && !isMember && !isAdmin) {
      return res.status(403).json({ success: false, message: 'Not authorized to create tasks in this project' });
    }

    const task = await Task.create({
      title,
      description: description || '',
      project: projectId,
      assignee: assignee || null,
      priority: priority || 'medium',
      dueDate: dueDate || null,
      createdBy: req.user.id
    });

    await task.populate('assignee', 'name email');
    await task.populate('createdBy', 'name email');
    await task.populate('comments.author', 'name email');

    res.status(201).json({ success: true, task });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const getProjectTasks = async (req, res) => {
  try {
    const { projectId } = req.params;

    const project = await Project.findById(projectId);
    if (!project) {
      return res.status(404).json({ success: false, message: 'Project not found' });
    }

    // Check access
    const isOwner = project.owner.toString() === req.user.id;
    const isMember = project.members.some(m => m.userId.toString() === req.user.id);
    const isAdmin = req.user.role === 'admin';

    if (!isOwner && !isMember && !isAdmin) {
      return res.status(403).json({ success: false, message: 'Not authorized to view tasks' });
    }

    const tasks = await Task.find({ project: projectId })
      .populate('assignee', 'name email')
      .populate('createdBy', 'name email')
      .populate('comments.author', 'name email')
      .sort('-createdAt');

    res.status(200).json({ success: true, tasks });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const getTask = async (req, res) => {
  try {
    const task = await Task.findById(req.params.id)
      .populate('assignee', 'name email')
      .populate('createdBy', 'name email')
      .populate('comments.author', 'name email')
      .populate('project');

    if (!task) {
      return res.status(404).json({ success: false, message: 'Task not found' });
    }

    // Check access
    const project = task.project;
    const isOwner = project.owner.toString() === req.user.id;
    const isMember = project.members.some(m => m.userId.toString() === req.user.id);
    const isAdmin = req.user.role === 'admin';

    if (!isOwner && !isMember && !isAdmin) {
      return res.status(403).json({ success: false, message: 'Not authorized to view this task' });
    }

    res.status(200).json({ success: true, task });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const updateTask = async (req, res) => {
  try {
    const { title, description, status, priority, assignee, dueDate } = req.body;
    let task = await Task.findById(req.params.id).populate('project');

    if (!task) {
      return res.status(404).json({ success: false, message: 'Task not found' });
    }

    const project = task.project;
    const isOwner = project.owner.toString() === req.user.id;
    const isMember = project.members.some(m => m.userId.toString() === req.user.id);
    const isAdmin = req.user.role === 'admin';
    const isAssignee = task.assignee && task.assignee.toString() === req.user.id;

    // Owner, admin, members, and assignees can update
    if (!isOwner && !isMember && !isAdmin && !isAssignee) {
      return res.status(403).json({ success: false, message: 'Not authorized to update this task' });
    }

    if (title) task.title = title;
    if (description !== undefined) task.description = description;
    if (status) task.status = status;
    if (priority) task.priority = priority;
    if (assignee !== undefined) task.assignee = assignee;
    if (dueDate !== undefined) task.dueDate = dueDate;
    task.updatedAt = Date.now();

    await task.save();
    await task.populate('assignee', 'name email');
    await task.populate('createdBy', 'name email');
    await task.populate('comments.author', 'name email');

    res.status(200).json({ success: true, task });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const deleteTask = async (req, res) => {
  try {
    const task = await Task.findById(req.params.id).populate('project');

    if (!task) {
      return res.status(404).json({ success: false, message: 'Task not found' });
    }

    const project = task.project;
    const isOwner = project.owner.toString() === req.user.id;
    const isAdmin = req.user.role === 'admin';

    // Only owner or admin can delete
    if (!isOwner && !isAdmin) {
      return res.status(403).json({ success: false, message: 'Not authorized to delete this task' });
    }

    await Task.findByIdAndDelete(req.params.id);

    res.status(200).json({ success: true, message: 'Task deleted successfully' });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const addComment = async (req, res) => {
  try {
    const { text } = req.body;
    let task = await Task.findById(req.params.id).populate('project');

    if (!task) {
      return res.status(404).json({ success: false, message: 'Task not found' });
    }

    const project = task.project;
    const isOwner = project.owner.toString() === req.user.id;
    const isMember = project.members.some(m => m.userId.toString() === req.user.id);
    const isAdmin = req.user.role === 'admin';

    // Project members can add comments
    if (!isOwner && !isMember && !isAdmin) {
      return res.status(403).json({ success: false, message: 'Not authorized to comment on this task' });
    }

    if (!text || text.trim() === '') {
      return res.status(400).json({ success: false, message: 'Please provide comment text' });
    }

    task.comments.push({
      author: req.user.id,
      text,
      createdAt: Date.now()
    });

    await task.save();
    await task.populate('comments.author', 'name email');

    res.status(200).json({ success: true, task });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};