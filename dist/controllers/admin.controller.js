import { generateToken } from '../utilities/paseto.utils.js';
import dotenv from 'dotenv';
dotenv.config();
const admin = {
    email: process.env.ADMIN_EMAIL,
    password: process.env.ADMIN_PASSWORD,
    role: process.env.ADMIN_ROLE,
};
export const adminLogin = async (req, res) => {
    const { email, password } = req.body;
    console.log('Admin credentials:', admin);
    console.log('Received credentials:', email, password);
    if (email === admin.email && password === admin.password) {
        const token = await generateToken({
            role: admin.role,
            email: admin.email,
        });
        console.log('Generated token:', token);
        res.json({ token });
    }
    else {
        res.status(401).json({ message: 'Invalid credentials' });
    }
};
