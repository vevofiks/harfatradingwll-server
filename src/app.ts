import express from 'express';
import dotenv from 'dotenv';
import adminRoutes from './routes/admin.route.js';
import categoryRoutes from './routes/category.route.js';
import productRoutes from './routes/product.route.js'





dotenv.config();

console.log('Connecting to MongoDB...',process.env.MONGODB_URI);

const app = express();

app.use(express.json());

app.use('/products', productRoutes);
app.use('/categories', categoryRoutes);
app.use('/admin', adminRoutes);

export default app;
