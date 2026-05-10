import express from 'express';
import {
  createTask,
  getProjectTasks,
  getTask,
  updateTask,
  deleteTask,
  addComment
} from '../controllers/taskController.js';
import { protect } from '../middleware/auth.js';

const router = express.Router();

router.use(protect);

router.post('/project/:projectId', createTask);
router.get('/project/:projectId', getProjectTasks);
router.get('/:id', getTask);
router.put('/:id', updateTask);
router.delete('/:id', deleteTask);
router.post('/:id/comments', addComment);

export default router;
