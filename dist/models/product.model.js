import mongoose, { Schema } from 'mongoose';
const ProductSchema = new Schema({
    name: { type: String, required: true },
    description: { type: String, required: true },
    image: { type: String, required: true },
    category: { type: Schema.Types.ObjectId, ref: 'Category', required: true },
    isBlocked: { type: Boolean, default: false }
}, {
    timestamps: true,
});
export const Product = mongoose.model('Product', ProductSchema);
