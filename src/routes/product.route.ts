import { Router } from 'express';
import * as productController from '../controllers/product.controller.js';

const router = Router();

router.get('/', productController.getAllProducts);
router.post('/', productController.createProduct);

export default router;
