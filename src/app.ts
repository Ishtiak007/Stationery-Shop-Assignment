import express, { Application, Request, Response } from 'express';
import { StationeryProductRoutes } from './app/modules/products/product.router';
const app: Application = express();
import cors from 'cors';

// Parsers
app.use(express.json());
app.use(cors());

// ALl  product routes
app.use('/api/products', StationeryProductRoutes);

app.get('/', (req: Request, res: Response) => {
  res.send('Hello developers, I am Ishtiak From Rangpur 👻!');
});

export default app;
