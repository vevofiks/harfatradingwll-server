import { Request, Response } from 'express';
import { Category } from '../models/category.model';

export const getAllCategories = async (_req: Request, res: Response) => {
  const categories = await Category.find();
  res.json(categories);
};

export const addCategory = async (req: Request, res: Response) => {
  const { name } = req.body;
  const category = await Category.create({ name });
  res.status(201).json(category);
};

export const updateCategory = async (req: Request, res: Response) => {
  const { id } = req.params;
  const updated = await Category.findByIdAndUpdate(id, req.body, { new: true });
  res.json(updated);
};

export const deleteCategory = async (req: Request, res: Response) => {
  const { id } = req.params;
  await Category.findByIdAndDelete(id);
  res.status(204).send();
};
