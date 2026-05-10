import User from '../models/User.js';
import Project from '../models/Project.js';
import Task from '../models/Task.js';

export const getAllUsers = async (req, res) => {
  try {
    // Only admins can access this
    if (req.user.role !== 'admin') {
      return res.status(403).json({ success: false, message: 'Only admins can access this endpoint' });
    }

    const users = await User.find()
      .select('-password')
      .sort('-createdAt');

    res.status(200).json({ success: true, users });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const updateUserRole = async (req, res) => {
  try {
    // Only admins can access this
    if (req.user.role !== 'admin') {
      return res.status(403).json({ success: false, message: 'Only admins can access this endpoint' });
    }

    const { userId, role } = req.body;

    if (!['admin', 'member'].includes(role)) {
      return res.status(400).json({ success: false, message: 'Invalid role' });
    }

    // Cannot change own role to member
    if (userId === req.user.id && role === 'member') {
      return res.status(400).json({ success: false, message: 'Cannot demote yourself' });
    }

    const user = await User.findByIdAndUpdate(
      userId,
      { role },
      { new: true, runValidators: true }
    ).select('-password');

    if (!user) {
      return res.status(404).json({ success: false, message: 'User not found' });
    }

    res.status(200).json({ success: true, user });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const deleteUser = async (req, res) => {
  try {
    // Only admins can access this
    if (req.user.role !== 'admin') {
      return res.status(403).json({ success: false, message: 'Only admins can access this endpoint' });
    }

    const { userId } = req.body;

    // Cannot delete yourself
    if (userId === req.user.id) {
      return res.status(400).json({ success: false, message: 'Cannot delete your own account' });
    }

    // Delete user's tasks and remove from projects
    await Task.deleteMany({ assignee: userId });
    await Task.deleteMany({ createdBy: userId });

    // Remove user from all projects
    await Project.updateMany(
      { 'members.userId': userId },
      { $pull: { members: { userId } } }
    );

    // Delete projects owned by user
    await Project.deleteMany({ owner: userId });

    // Delete user
    const user = await User.findByIdAndDelete(userId);

    if (!user) {
      return res.status(404).json({ success: false, message: 'User not found' });
    }

    res.status(200).json({ success: true, message: 'User deleted successfully' });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const getDashboardStats = async (req, res) => {
  try {
    const totalUsers = await User.countDocuments();
    const adminUsers = await User.countDocuments({ role: 'admin' });
    const memberUsers = await User.countDocuments({ role: 'member' });
    
    const totalProjects = await Project.countDocuments();
    const activeProjects = await Project.countDocuments({ status: 'active' });
    const completedProjects = await Project.countDocuments({ status: 'completed' });
    
    const totalTasks = await Task.countDocuments();
    const completedTasks = await Task.countDocuments({ status: 'completed' });
    const overdueTasks = await Task.countDocuments({
      status: { $ne: 'completed' },
      dueDate: { $lt: new Date() }
    });

    const recentUsers = await User.find()
      .select('-password')
      .sort('-createdAt')
      .limit(5);

    const recentProjects = await Project.find()
      .populate('owner', 'name email')
      .sort('-createdAt')
      .limit(5);

    res.status(200).json({
      success: true,
      stats: {
        users: {
          total: totalUsers,
          admin: adminUsers,
          member: memberUsers
        },
        projects: {
          total: totalProjects,
          active: activeProjects,
          completed: completedProjects
        },
        tasks: {
          total: totalTasks,
          completed: completedTasks,
          overdue: overdueTasks
        }
      },
      recentUsers,
      recentProjects
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
