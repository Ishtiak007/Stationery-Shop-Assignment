import express, { Application, Request, Response } from 'express';
import { StationeryProductRoutes } from './app/modules/products/product.router';
const app: Application = express();
import cors from 'cors';
import { OrderProductRoutes } from './app/modules/order/order.router';

// Parsers
app.use(express.json());
app.use(cors());

// ALl  products related routes
app.use('/api/products', StationeryProductRoutes);

// All orders related routes
app.use('/api/orders', OrderProductRoutes);

app.get('/', (req: Request, res: Response) => {
  res.send('Hello developers, I am Ishtiak From Rangpur 👻!');
});

export default app;
