import * as adminController from '../controllers/admin.controller';
import { Router } from 'express';
const router = Router();
router.post('/login', adminController.adminLogin);
export default router;
