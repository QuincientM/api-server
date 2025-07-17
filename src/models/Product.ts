import mongoose, { Schema, Document } from 'mongoose';

export interface IProduct extends Document {
  id_: string;
  id: string;
  title: string;
  image: string;
  price: number;
  link: string;
}

const ProductSchema = new Schema<IProduct>({
  id_: { type: String, required: true },
  id: { type: String, required: true },
  title: { type: String, required: true },
  image: { type: String, required: true },
  price: { type: Number, required: true },
  link: { type: String, required: true }
});

export const ProductModel = mongoose.model<IProduct>('Product', ProductSchema);