# Stationery-Shop-Assignment

## LIVE LINK

[Stationery Shop](https://assignment-2-theta-lyart.vercel.app/)

## Folder Structure

```
src/
├── app/
│ ├── config/
│ │ └── index.ts
│ └── modules/
│ ├── order/
│ │ ├── order.controller.ts
│ │ ├── order.interface.ts
│ │ ├── order.router.ts
│ │ ├── order.schemaModel.ts
│ │ ├── order.service.ts
│ │ └── order.validationWithZod.ts
│ ├── products/
│ │ ├── product.controller.ts
│ │ ├── product.interface.ts
│ │ ├── product.model.ts
│ │ ├── product.router.ts
│ │ ├── product.service.ts
│ │ └── product.validationWithZod.ts
├── app.ts
└── server.ts
```

## Mongoose Model

```typescript
import mongoose, { Schema, Document } from 'mongoose';

export interface IUser extends Document {
  name: string;
  email: string;
  age: number;
}

const userSchema = new Schema<IUser>({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  age: { type: Number, required: true },
});

export const User = mongoose.model<IUser>('User', userSchema);
```

## Zod Validation

```typescript
import { z } from 'zod';

export const createUserSchema = z.object({
  body: z.object({
    name: z.string().min(3, 'Name must be at least 3 characters long'),
    email: z.string().email('Invalid email address'),
    age: z.number().int().min(1, 'Age must be a positive number'),
  }),
});

export const updateUserSchema = z.object({
  body: z.object({
    name: z.string().optional(),
    email: z.string().email('Invalid email address').optional(),
    age: z.number().int().min(1, 'Age must be a positive number').optional(),
  }),
});
```

## Express Controller

```typescript
import { Request, Response } from 'express';
import { User } from '../models/user.model';

export const createUser = async (req: Request, res: Response) => {
  try {
    const user = new User(req.body);
    const savedUser = await user.save();
    res.status(201).json(savedUser);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

export const getUsers = async (req: Request, res: Response) => {
  try {
    const users = await User.find();
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const updateUser = async (req: Request, res: Response) => {
  try {
    const user = await User.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.status(200).json(user);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

export const deleteUser = async (req: Request, res: Response) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.status(200).json({ message: 'User deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
```

## Express Routes

```typescript
import express from 'express';
import {
  createUser,
  getUsers,
  updateUser,
  deleteUser,
} from '../controllers/user.controller';
import {
  createUserSchema,
  updateUserSchema,
} from '../validations/user.validation';
import { validate } from 'express-zod';

const router = express.Router();

router.post('/', validate(createUserSchema), createUser);
router.get('/', getUsers);
router.put('/:id', validate(updateUserSchema), updateUser);
router.delete('/:id', deleteUser);

export default router;
```

## Express App Setup

```typescript
import express from 'express';
import userRoutes from './routes/user.routes';

const app = express();

app.use(express.json());
app.use('/api/users', userRoutes);

export default app;
```

## Server Setup

```typescript
import mongoose from 'mongoose';
import app from './app';

const PORT = process.env.PORT || 5000;
const MONGO_URI = 'demo-url';

mongoose
  .connect(MONGO_URI)
  .then(() => {
    console.log('Connected to MongoDB');
    app.listen(PORT, () => {
      console.log(`Server is running on http://localhost:${PORT}`);
    });
  })
  .catch((error) => console.error('MongoDB connection error:', error));
```
