"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteCategory = exports.updateCategory = exports.addCategory = exports.getAllCategories = void 0;
const category_model_1 = require("../models/category.model");
const getAllCategories = async (_req, res) => {
    const categories = await category_model_1.Category.find();
    res.json(categories);
};
exports.getAllCategories = getAllCategories;
const addCategory = async (req, res) => {
    const { name } = req.body;
    const category = await category_model_1.Category.create({ name });
    res.status(201).json(category);
};
exports.addCategory = addCategory;
const updateCategory = async (req, res) => {
    const { id } = req.params;
    const updated = await category_model_1.Category.findByIdAndUpdate(id, req.body, { new: true });
    res.json(updated);
};
exports.updateCategory = updateCategory;
const deleteCategory = async (req, res) => {
    const { id } = req.params;
    await category_model_1.Category.findByIdAndDelete(id);
    res.status(204).send();
};
exports.deleteCategory = deleteCategory;
