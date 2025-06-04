import mongoose, { Schema } from 'mongoose';
const CategorySchema = new Schema({
    name: { type: String, required: true, unique: true },
    isBlocked: { type: Boolean, default: false },
}, {
    timestamps: true,
});
export const Category = mongoose.model('Category', CategorySchema);
