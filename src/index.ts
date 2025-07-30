import express, { Request, Response } from 'express';
import { Product } from './Products';
import { v4 as uuidv4 } from 'uuid';
import dotenv from 'dotenv';
import connectDB from './DB';
import { ProductModel, IProduct } from './models/Product';
import { Update } from './Update';
import mongoose from 'mongoose';

const app = express();
const port = process.env.PORT || 3000;
app.use(express.json()); //connect mongoDB
connectDB();
dotenv.config();

if (!process.env.MONGO_URL) {
  throw new Error("❌ Missing MONGO_URL in environment variables");
}

mongoose.connect(process.env.MONGO_URL)
  .then(() => {
    console.log("✅ Connected to MongoDB");
  })
  .catch((err: unknown) => {
    if (err instanceof Error) {
      console.error("❌ MongoDB connection error:", err.message);
    } else {
      console.error("❌ Unknown MongoDB error:", err);
    }
  });


// Root route
app.get('/', (req: Request, res: Response) => {
  res.send('Hello from Express with MongoDB + TypeScript!');
});

// READ all products
app.get('/products', async (req: Request, res: Response<IProduct[]>) => {
  const products = await ProductModel.find();
  res.json(products);
});

// CREATE a new product
app.post('/product', async (req: Request, res: Response<IProduct>) => {
  const newProduct = new ProductModel({ id_: uuidv4(), ...req.body });
  await newProduct.save();
  res.status(201).json(newProduct);
});

// UPDATE a product by ID
app.put('/products/:id', async (req: Request, res: Response) => {
  const { id } = req.params;
  const updated = await ProductModel.findOneAndUpdate({ id }, req.body, { new: true });

  if (!updated) {
    return res.status(404).json({ error: 'Product not found' });
  }

  res.json(updated);
});

// DELETE a product by ID
app.delete('/products/:id', async (req: Request, res: Response) => {
  const { id } = req.params;
  const deleted = await ProductModel.findOneAndDelete({ id });

  if (!deleted) {
    return res.status(404).json({ error: 'Product not found' });
  }

  res.json({ message: 'Product deleted', product: deleted });
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});