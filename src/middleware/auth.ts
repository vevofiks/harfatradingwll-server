// middleware/auth.ts
import { Request, Response, NextFunction } from 'express';
import { verifyToken } from '../utilities/paseto.utils.js';

export const authenticate = async (req: Request, res: Response, next: NextFunction) => {
  const authHeader = req.headers.authorization;
  if (!authHeader) return res.status(401).json({ message: 'Authorization header missing' });

  const token = authHeader.split(' ')[1];
  const payload = await verifyToken(token);
  if (!payload) return res.status(401).json({ message: 'Invalid token' });

  req.user = payload;
  next();
};

export const authorize = (requiredRole: string) => {
  return (req: Request, res: Response, next: NextFunction) => {
    if (req.user?.role !== requiredRole) {
      return res.status(403).json({ message: 'Forbidden: Insufficient permissions' });
    }
    next();
  };
};
