import mongoose, { Schema, Document } from 'mongoose';

export interface ProductDocument extends Document {
  name: string;
  description: string;
  category: mongoose.Schema.Types.ObjectId;
  image: string;
  isBlocked: boolean;
}

const ProductSchema = new Schema<ProductDocument>({
  name: { type: String, required: true },
  description: { type: String, required: true },
  image: { type: String, required: true }, 
  category: { type: Schema.Types.ObjectId, ref: 'Category', required: true },
  isBlocked: { type: Boolean, default: false }
},
{
  timestamps: true,
});

export const Product = mongoose.model<ProductDocument>('Product', ProductSchema);
