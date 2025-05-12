"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteProduct = exports.editProduct = exports.getProductById = exports.getAllProducts = exports.createProduct = void 0;
const product_model_1 = require("../models/product.model");
const createProduct = async (req, res) => {
    try {
        const { name, description, category, images } = req.body;
        const product = new product_model_1.Product({ name, description, category, images });
        await product.save();
        res.status(201).json({ message: 'Product created', product });
    }
    catch (err) {
        res.status(500).json({ error: 'Failed to create product', details: err });
    }
};
exports.createProduct = createProduct;
const getAllProducts = async (_req, res) => {
    try {
        const products = await product_model_1.Product.find();
        res.json(products);
    }
    catch (err) {
        res.status(500).json({ error: 'Failed to fetch products' });
    }
};
exports.getAllProducts = getAllProducts;
const getProductById = async (req, res) => {
    try {
        const product = await product_model_1.Product.findById(req.params.id);
        if (!product)
            return res.status(404).json({ error: 'Product not found' });
        res.json(product);
    }
    catch (err) {
        res.status(500).json({ error: 'Error fetching product' });
    }
};
exports.getProductById = getProductById;
const editProduct = async (req, res) => {
    try {
        const updatedProduct = await product_model_1.Product.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!updatedProduct)
            return res.status(404).json({ error: 'Product not found' });
        res.json({ message: 'Product updated', product: updatedProduct });
    }
    catch (err) {
        res.status(500).json({ error: 'Failed to update product' });
    }
};
exports.editProduct = editProduct;
const deleteProduct = async (req, res) => {
    try {
        const deletedProduct = await product_model_1.Product.findByIdAndDelete(req.params.id);
        if (!deletedProduct)
            return res.status(404).json({ error: 'Product not found' });
        res.json({ message: 'Product deleted' });
    }
    catch (err) {
        res.status(500).json({ error: 'Failed to delete product' });
    }
};
exports.deleteProduct = deleteProduct;
