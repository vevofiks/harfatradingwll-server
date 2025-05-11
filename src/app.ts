import express from 'express';
import dotenv from 'dotenv';
import adminRoutes from './routes/admin.route.ts';
import categoryRoutes from './routes/category.route.ts';
import productRoutes from './routes/product.route.ts'





dotenv.config();

const app = express();

app.use(express.json());

app.use('/products', productRoutes);
app.use('/categories', categoryRoutes);
app.use('/admin', adminRoutes);

export default app;
