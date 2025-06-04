import { Category } from '../models/category.model.js';
export const getAllCategories = async (req, res) => {
    try {
        const categories = await Category.find({ isBlocked: false });
        return void res.status(200).json({
            status: true,
            message: 'Categories fetched successfully.',
            data: categories
        });
    }
    catch (error) {
        console.error('Error in getAllCategories:', error);
        return void res.status(500).json({
            status: false,
            message: 'Internal server error.'
        });
    }
};
export const addCategory = async (req, res) => {
    try {
        const { name } = req.body;
        console.log('Adding category:', name);
        if (!name || name.trim() === '') {
            return void res.status(400).json({ status: false, message: 'Category name is required.' });
        }
        const existing = await Category.findOne({ name: { $regex: new RegExp(`^${name}$`, 'i') } });
        if (existing) {
            return void res.status(400).json({
                status: false,
                message: 'Category with this name already exists.'
            });
        }
        const category = await Category.create({ name });
        return void res.status(201).json({
            status: true,
            message: 'Category added successfully.',
            data: category
        });
    }
    catch (error) {
        console.error('Error in addCategory:', error);
        return void res.status(500).json({
            status: false,
            message: 'Internal server error.'
        });
    }
};
export const updateCategory = async (req, res) => {
    try {
        const { id } = req.params;
        const { name } = req.body;
        if (!name || name.trim() === '') {
            return void res.status(400).json({ status: false, message: 'Category name is required.' });
        }
        const existing = await Category.findOne({ name: { $regex: new RegExp(`^${name}$`, 'i') }, _id: { $ne: id } });
        if (existing) {
            return void res.status(400).json({ status: false, message: 'Another category with this name already exists.' });
        }
        const updated = await Category.findByIdAndUpdate(id, { name }, { new: true });
        if (!updated) {
            return void res.status(404).json({ status: false, message: 'Category not found.' });
        }
        return void res.status(200).json({ status: true, message: 'Category updated successfully.', data: updated });
    }
    catch (error) {
        console.error('Error in updateCategory:', error);
        return void res.status(500).json({ status: false, message: 'Internal server error.' });
    }
};
export const deleteCategory = async (req, res) => {
    try {
        const { id } = req.params;
        const deleted = await Category.findByIdAndDelete(id);
        if (!deleted) {
            return void res.status(404).json({ status: false, message: 'Category not found.' });
        }
        return void res.status(200).json({ status: true, message: 'Category deleted successfully.' });
    }
    catch (error) {
        console.error('Error in deleteCategory:', error);
        return void res.status(500).json({ status: false, message: 'Internal server error.' });
    }
};
export const toggleCategoryBlock = async (req, res) => {
    try {
        const { id } = req.params;
        const category = await Category.findById(id);
        if (!category) {
            return void res.status(404).json({ status: false, message: 'Category not found.' });
        }
        category.isBlocked = !category.isBlocked;
        await category.save();
        const blockStatus = category.isBlocked ? 'blocked' : 'unblocked';
        return void res.status(200).json({ status: true, message: `Category ${blockStatus} successfully.`, data: category });
    }
    catch (error) {
        console.error('Error in toggleCategoryBlock:', error);
        return void res.status(500).json({ status: false, message: 'Internal server error.' });
    }
};
export const getBlockedCategories = async (_req, res) => {
    try {
        const categories = await Category.find({ isBlocked: true });
        return void res.status(200).json({ status: true, message: 'Blocked categories fetched successfully.', data: categories });
    }
    catch (error) {
        console.error('Error in getBlockedCategories:', error);
        return void res.status(500).json({ status: false, message: 'Internal server error.' });
    }
};
export const getUnblockedCategories = async (_req, res) => {
    try {
        const categories = await Category.find({ isBlocked: false });
        if (!categories || categories.length === 0) {
            return void res.status(404).json({ status: false, message: 'No unblocked categories found.' });
        }
        return void res.status(200).json({ status: true, message: 'Unblocked categories fetched successfully.', data: categories });
    }
    catch (error) {
        console.error('Error in getUnblockedCategories:', error);
        return void res.status(500).json({ status: false, message: 'Internal server error.' });
    }
};
