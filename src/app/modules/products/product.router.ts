import express from 'express';
import { ProductControllers } from './product.controller';

const router = express.Router();

// Create a product from database
router.post('/', ProductControllers.createProduct);

// get all products from database
router.get('/', ProductControllers.getAllStationeryProducts);

// get single product by its ID from database
router.get('/:productId', ProductControllers.getSingleProductFromDB);

export const StationeryProductRoutes = router;
