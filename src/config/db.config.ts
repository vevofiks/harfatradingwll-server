import { MongoClient } from 'mongodb';
import dotenv from 'dotenv';
import mongoose from 'mongoose';

dotenv.config(); 

const uri = process.env.MONGODB_URI as string;
const client = new MongoClient(uri);

export const connectDB = async () => {
  try {
    console.log('MongoDB URI:', process.env.MONGODB_URI);

    await mongoose.connect(process.env.MONGODB_URI!, {
      serverSelectionTimeoutMS: 5000,
      socketTimeoutMS: 45000,
    });
    console.log('MongoDB connected');
  } catch (error) {
    console.error('MongoDB connection error:', error);
    process.exit(1);
  }
};

export default client;
