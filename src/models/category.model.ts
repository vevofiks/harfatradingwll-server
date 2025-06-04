import mongoose, { Schema, Document } from 'mongoose';

export interface CategoryDocument extends Document {
  name: string;
  isBlocked: boolean;
}

const CategorySchema = new Schema<CategoryDocument>({
  name: { type: String, required: true, unique: true },
  isBlocked:{type: Boolean, default: false},
},
{
  timestamps: true,
});

export const Category = mongoose.model<CategoryDocument>('Category', CategorySchema);
