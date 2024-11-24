import express from 'express';
import { orderController } from './order.controller';

const router = express.Router();

// Create an stationary shop order
router.post('/', orderController.createOrderController); //Endpoint: /api/orders

export const OrderProductRoutes = router;
