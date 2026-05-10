import Project from '../models/Project.js';
import Task from '../models/Task.js';
import User from '../models/User.js';

export const createProject = async (req, res) => {
  try {
    const { name, description } = req.body;

    if (!name) {
      return res.status(400).json({ success: false, message: 'Please provide a project name' });
    }

    const project = await Project.create({
      name,
      description: description || '',
      owner: req.user.id,
      members: [{
        userId: req.user.id,
        role: 'lead'
      }]
    });

    await project.populate('owner members.userId', 'name email role');

    res.status(201).json({ success: true, project });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const getProjects = async (req, res) => {
  try {
    let query = {};
    
    if (req.user.role === 'admin') {
      // Admins can see all projects
      query = {};
    } else {
      // Regular users see only their projects
      query = {
        $or: [
          { owner: req.user.id },
          { 'members.userId': req.user.id }
        ]
      };
    }

    const projects = await Project.find(query)
      .populate('owner', 'name email role')
      .populate('members.userId', 'name email role')
      .sort('-createdAt');

    res.status(200).json({ success: true, projects });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const getProject = async (req, res) => {
  try {
    const project = await Project.findById(req.params.id)
      .populate('owner', 'name email role')
      .populate('members.userId', 'name email role');

    if (!project) {
      return res.status(404).json({ success: false, message: 'Project not found' });
    }

    // Check access: owner, member, or admin
    const isOwner = project.owner._id.toString() === req.user.id;
    const isMember = project.members.some(m => m.userId._id.toString() === req.user.id);
    const isAdmin = req.user.role === 'admin';

    if (!isOwner && !isMember && !isAdmin) {
      return res.status(403).json({ success: false, message: 'Not authorized to view this project' });
    }

    res.status(200).json({ success: true, project });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const updateProject = async (req, res) => {
  try {
    const { name, description, status } = req.body;
    let project = await Project.findById(req.params.id);

    if (!project) {
      return res.status(404).json({ success: false, message: 'Project not found' });
    }

    // Only owner or admin can update
    if (project.owner.toString() !== req.user.id && req.user.role !== 'admin') {
      return res.status(403).json({ success: false, message: 'Not authorized to update this project' });
    }

    if (name) project.name = name;
    if (description !== undefined) project.description = description;
    if (status) project.status = status;
    project.updatedAt = Date.now();

    await project.save();
    await project.populate('owner', 'name email role');
    await project.populate('members.userId', 'name email role');

    res.status(200).json({ success: true, project });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const deleteProject = async (req, res) => {
  try {
    const project = await Project.findById(req.params.id);

    if (!project) {
      return res.status(404).json({ success: false, message: 'Project not found' });
    }

    // Only owner or admin can delete
    if (project.owner.toString() !== req.user.id && req.user.role !== 'admin') {
      return res.status(403).json({ success: false, message: 'Not authorized to delete this project' });
    }

    await Task.deleteMany({ project: req.params.id });
    await Project.findByIdAndDelete(req.params.id);

    res.status(200).json({ success: true, message: 'Project deleted successfully' });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const addMember = async (req, res) => {
  try {
    const { userId, role = 'member' } = req.body;
    let project = await Project.findById(req.params.id);

    if (!project) {
      return res.status(404).json({ success: false, message: 'Project not found' });
    }

    // Only owner or admin can add members
    if (project.owner.toString() !== req.user.id && req.user.role !== 'admin') {
      return res.status(403).json({ success: false, message: 'Not authorized to add members' });
    }

    // Check if user exists
    const userExists = await User.findById(userId);
    if (!userExists) {
      return res.status(404).json({ success: false, message: 'User not found' });
    }

    // Check if already a member
    if (project.members.some(m => m.userId.toString() === userId)) {
      return res.status(400).json({ success: false, message: 'User already a member' });
    }

    // Cannot add if user is owner
    if (project.owner.toString() === userId) {
      return res.status(400).json({ success: false, message: 'Owner cannot be added as member' });
    }

    project.members.push({
      userId,
      role
    });

    await project.save();
    await project.populate('owner', 'name email role');
    await project.populate('members.userId', 'name email role');

    res.status(200).json({ success: true, project });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const removeMember = async (req, res) => {
  try {
    const { memberId } = req.body;
    let project = await Project.findById(req.params.id);

    if (!project) {
      return res.status(404).json({ success: false, message: 'Project not found' });
    }

    // Only owner or admin can remove members
    if (project.owner.toString() !== req.user.id && req.user.role !== 'admin') {
      return res.status(403).json({ success: false, message: 'Not authorized to remove members' });
    }

    // Cannot remove owner
    if (project.owner.toString() === memberId) {
      return res.status(400).json({ success: false, message: 'Cannot remove project owner' });
    }

    project.members = project.members.filter(m => m.userId.toString() !== memberId);

    await project.save();
    await project.populate('owner', 'name email role');
    await project.populate('members.userId', 'name email role');

    res.status(200).json({ success: true, project });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const updateMemberRole = async (req, res) => {
  try {
    const { memberId, role } = req.body;
    let project = await Project.findById(req.params.id);

    if (!project) {
      return res.status(404).json({ success: false, message: 'Project not found' });
    }

    // Only owner or admin can change member roles
    if (project.owner.toString() !== req.user.id && req.user.role !== 'admin') {
      return res.status(403).json({ success: false, message: 'Not authorized to change member roles' });
    }

    const member = project.members.find(m => m.userId.toString() === memberId);
    if (!member) {
      return res.status(404).json({ success: false, message: 'Member not found' });
    }

    if (!['member', 'lead'].includes(role)) {
      return res.status(400).json({ success: false, message: 'Invalid role' });
    }

    member.role = role;
    await project.save();
    await project.populate('owner', 'name email role');
    await project.populate('members.userId', 'name email role');

    res.status(200).json({ success: true, project });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};