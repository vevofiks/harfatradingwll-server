import { MongoClient } from 'mongodb';
import dotenv from 'dotenv';
dotenv.config();
const uri = process.env.MONGODB_URI;
const client = new MongoClient(uri);
export const connectDB = async () => {
    try {
        console.log('MongoDB URI:', process.env.MONGODB_URI);
        await client.connect();
        console.log('MongoDB connected');
    }
    catch (error) {
        console.error('MongoDB connection error:', error);
        process.exit(1);
    }
};
export default client;
