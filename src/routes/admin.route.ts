import * as adminController from '../controllers/admin.controller.ts';


import { Router } from 'express';

const router = Router();

router.post('/login', adminController.adminLogin);

export default router;