"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.adminLogin = void 0;
const paseto_utils_1 = require("../utilities/paseto.utils");
const admin = {
    name: 'SuperAdmin',
    email: 'admin@gmail.com',
    password: 'admin123',
    role: 'admin'
};
const adminLogin = async (req, res) => {
    const { email, password } = req.body;
    if (email === admin.email && password === admin.password) {
        const token = await (0, paseto_utils_1.generateToken)({ role: admin.role, username: admin.name });
        res.json({ token });
    }
    else {
        res.status(401).json({ message: 'Invalid credentials' });
    }
};
exports.adminLogin = adminLogin;
