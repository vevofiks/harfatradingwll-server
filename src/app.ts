import express from 'express';
import dotenv from 'dotenv';
dotenv.config();
import adminRoutes from './routes/admin.route.js';
import cors from 'cors';


const app = express();



app.use(cors({ origin: 'http://localhost:3000', credentials: true }));
dotenv.config();

console.log('Connecting to MongoDB...',process.env.MONGODB_URI);


app.use(express.json({ limit: '10mb' }));

app.use('/admin', adminRoutes);

export default app;
