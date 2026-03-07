import mongoose from "mongoose";

const ProductSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    price: { type: Number, required: true },
    category: { type: String, required: true },
    image: { type: String, required: true },
    stock: { type: Number, default: 0 },
    brand: { type: String },
    addedBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" }, // কোন ইউজার প্রোডাক্টটি অ্যাড করেছে
  },
  { timestamps: true }
);

export const Product = mongoose.models.Product || mongoose.model("Product", ProductSchema);