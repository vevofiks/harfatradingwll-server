import { RequestHandler } from 'express';
import { Product } from '../models/product.model.js';
import { uploadToS3 } from '../utilities/s3.utils.js';
import dotenv from 'dotenv';
dotenv.config();

export const getAllProducts: RequestHandler = async (req, res) => {
  try {
    const products = await Product.find({ isBlocked: false })
      .populate({
        path: 'category',
        match: { isBlocked: false },
      });

    const filteredProducts = products.filter((product) => product.category);

    res.status(200).json({
      status: true,
      message: 'Products fetched successfully.',
      data: filteredProducts,
    });
  } catch (error) {
    console.error('Error in getAllProducts:', error);
    res.status(500).json({ status: false, message: 'Internal server error.' });
  }
};



export const createProduct: RequestHandler = async (req, res) => {
  try {
    const { name, description, category } = req.body;
    console.log('Creating product with data:', req.body);

    if (!name || !description || !category) {
      res.status(400).json({
        status: false,
        message: 'Name, description, and category are required.'
      });
      return; 
    }

    if (!req.file) {
      res.status(400).json({
        status: false,
        message: 'Product image is required.'
      });
      return;
    }

    const imageUrl = await uploadToS3(req.file.buffer, req.file.originalname);
    console.log('Image uploaded to S3:', imageUrl);

    const product = await Product.create({
      name,
      description,
      category,
      image: imageUrl,
    });

    const populatedProduct = await Product.findById(product._id).populate('category', 'name');

    res.status(201).json({
      status: true,
      message: 'Product created successfully.',
      data: populatedProduct,
    });
  } catch (error) {
    console.error('Error creating product:', error);
    res.status(500).json({ 
      status: false, 
      message: 'Internal server error.',
    });
  }
};


export const updateProduct: RequestHandler = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, description, category } = req.body;

    const product = await Product.findById(id);
    if (!product) {
      return void res.status(404).json({ status: false, message: 'Product not found.' });
    }

    if (req.file) {
      const imageName = `${Date.now()}-${req.file.originalname}`;
      const imageUrl = await uploadToS3(req.file.buffer, imageName, req.file.mimetype);
      product.image = imageUrl;
    }

    product.name = name ?? product.name;
    product.description = description ?? product.description;
    product.category = category ?? product.category;

    await product.save();

    const populatedProduct = await Product.findById(product._id).populate('category', 'name');

    return void res.status(200).json({
      status: true,
      message: 'Product updated successfully.',
      data: populatedProduct,
    });
  } catch (error) {
    console.error('Error in updateProduct:', error);
    return void res.status(500).json({ status: false, message: 'Internal server error.' });
  }
};



export const deleteProduct: RequestHandler = async (req, res) => {
  try {
    const { id } = req.params;
    const deleted = await Product.findByIdAndDelete(id);
    if (!deleted) {
      return void res.status(404).json({ status: false, message: 'Product not found.' });
    }

    res.status(200).json({ status: true, message: 'Product deleted successfully.' });
  } catch (error) {
    console.error('Error in deleteProduct:', error);
    res.status(500).json({ status: false, message: 'Internal server error.' });
  }
};

export const toggleProductBlock: RequestHandler = async (req, res) => {
  try {
    const { id } = req.params;
    const product = await Product.findById(id);

    if (!product) {
      return void res.status(404).json({ status: false, message: 'Product not found.' });
    }

    product.isBlocked = !product.isBlocked;
    await product.save();

    res.status(200).json({
      status: true,
      message: `Product ${product.isBlocked ? 'blocked' : 'unblocked'} successfully.`,
      data: product,
    });
  } catch (error) {
    console.error('Error in toggleProductBlock:', error);
    res.status(500).json({ status: false, message: 'Internal server error.' });
  }
};

export const getBlockedProducts: RequestHandler = async (_req, res) => {
  try {
    const products = await Product.find({ isBlocked: true });
    res.status(200).json({ status: true, message: 'Blocked products fetched.', data: products });
  } catch (error) {
    console.error('Error in getBlockedProducts:', error);
    res.status(500).json({ status: false, message: 'Internal server error.' });
  }
};

export const getUnblockedProducts: RequestHandler = async (_req, res) => {
  try {
    const products = await Product.find({ isBlocked: false });
    res.status(200).json({ status: true, message: 'Unblocked products fetched.', data: products });
  } catch (error) {
    console.error('Error in getUnblockedProducts:', error);
    res.status(500).json({ status: false, message: 'Internal server error.' });
  }
};


export const getNewArrivals: RequestHandler = async (req, res) => {
  try {
    const twoWeeksAgo = new Date();
    twoWeeksAgo.setDate(twoWeeksAgo.getDate() - 14);

    const products = await Product.find({
      isBlocked: false,
      createdAt: { $gte: twoWeeksAgo }
    }).populate({
      path: 'category',
      match: { isBlocked: false },
    });

    const filteredProducts = products.filter(product => product.category);


    res.status(200).json({
      status: true,
      message: 'New arrivals fetched successfully.',
      data: filteredProducts,
    });
  } catch (error) {
    console.error('Error in getNewArrivals:', error);
    res.status(500).json({ status: false, message: 'Internal server error.' });
  }
};

export const getProductById: RequestHandler = async (req, res) => {
  try {
    const { id } = req.params;
    const product = await Product.findById(id).populate('category', 'name');

    if (!product) {
      return void res.status(404).json({ status: false, message: 'Product not found.' });
    }

    res.status(200).json({
      status: true,
      message: 'Product fetched successfully.',
      data: product,
    });
  } catch (error) {
    console.error('Error in getProductById:', error);
    res.status(500).json({ status: false, message: 'Internal server error.' });
  }
};


export const getProductsByCategory: RequestHandler = async (req, res) => {
  try {
    const { categoryId } = req.params;
    console.log('Fetching products for category:', categoryId);
    const products = await Product.find({
      category: categoryId,
      isBlocked: false
    }).populate('category');
    console.log('Products found:', products.length);
    if (products.length === 0) {
      return void res.status(200).json({ status: true, message: 'No products found for this category.' });
    }     
    res.status(200).json({
      status: true,
      message: 'Products fetched successfully.',
      data: products,
    });
  } catch (error) {
    console.error('Error in getProductsByCategory:', error);
    res.status(500).json({ status: false, message: 'Internal server error.' });
  }
};



