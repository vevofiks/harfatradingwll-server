import app from './app.js';
import { connectDB } from './config/db.config.js';
const PORT = process.env.PORT || 5000;
console.log('Starting server...');
const startServer = async () => {
    await connectDB();
    app.listen(PORT, () => {
        console.log(`Server running on port ${PORT}`);
    });
};
startServer();
