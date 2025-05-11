import { Router } from 'express';
import * as productController from '../controllers/product.controller.ts';

const router = Router();

router.get('/', productController.getAllProducts);
router.post('/', productController.createProduct);

export default router;
