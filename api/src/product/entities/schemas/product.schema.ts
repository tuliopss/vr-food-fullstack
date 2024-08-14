import mongoose from 'mongoose';

export const ProductSchema = new mongoose.Schema(
  {
    title: { type: String },
    quantity: { type: String },
    price: { type: String },
  },
  { timestamps: true, collection: 'products' },
);
