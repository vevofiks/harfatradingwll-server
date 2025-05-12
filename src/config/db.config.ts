import { MongoClient } from 'mongodb';
import path from 'path';
import dotenv from 'dotenv';

const envPath = path.resolve(__dirname, '../.env');

dotenv.config({ path: envPath });

const uri = process.env.MONGODB_URI as string;
const client = new MongoClient(uri);

export const connectDB = async () => {
  try {
    await client.connect();
    console.log('MongoDB connected');
  } catch (error) {
    console.error('MongoDB connection error:', error);
    process.exit(1);
  }
};

export default client;
