import * as adminController from '../controllers/admin.controller.js';


import { Router } from 'express';

const router = Router();

router.post('/login', adminController.adminLogin);

export default router;