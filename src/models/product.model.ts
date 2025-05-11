import mongoose, { Schema, Document } from 'mongoose';

export interface ProductDocument extends Document {
  name: string;
  description: string;
  category: string;
  images: string[];
}

const ProductSchema = new Schema<ProductDocument>({
  name: { type: String, required: true },
  description: { type: String, required: true },
  category: { type: String, required: true }, 
  images: [{ type: String }]
});

export const Product = mongoose.model<ProductDocument>('Product', ProductSchema);
