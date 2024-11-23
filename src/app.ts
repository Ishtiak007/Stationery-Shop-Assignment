import express, { Application, Request, Response } from 'express';
const app: Application = express();

app.get('/', (req: Request, res: Response) => {
  res.send('Hello developers, I am Ishtiak From Rangpur 👻!');
});

export default app;
