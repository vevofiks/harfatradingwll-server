import { Request, Response } from 'express';
import crypto from 'crypto';
import { generateToken } from '../utilities/paseto.utils';

const admin = {
  name: 'SuperAdmin',
  email: 'admin@gmail.com',
  password: 'admin123',
  role:'admin'
};

export const adminLogin = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  if (email === admin.email && password === admin.password) {
    const token = await generateToken({ role: admin.role, username: admin.name });
    res.json({ token });
  } else {
    res.status(401).json({ message: 'Invalid credentials' });
  }
};
