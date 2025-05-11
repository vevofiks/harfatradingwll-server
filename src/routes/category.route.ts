import { Router } from 'express';
import {
  getAllCategories,
  addCategory,
  updateCategory,
  deleteCategory,
} from '../controllers/category.controller.js';

const router = Router();

router.get('/', getAllCategories);
router.post('/add', addCategory);
router.put('/:id', updateCategory);
router.delete('/:id', deleteCategory);

export default router; 