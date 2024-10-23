import mongoose, { Document, Schema } from "mongoose";

// Define an interface for the product model
export interface IProduct extends Document {
  _id: mongoose.Types.ObjectId;
  title: string;
  description: string;
  price: number;
  category: string;
  stock: number;
  imageUrl: string;
  createdAt: Date;
  updatedAt: Date;
}

// Create the product schema
const ProductSchema: Schema<IProduct> = new Schema({
  title: {
    type: String,
    required: true,
    trim: true, // Remove whitespace
  },
  description: {
    type: String,
    required: true,
    trim: true, // Remove whitespace
  },
  price: {
    type: Number,
    required: true,
    min: 0, // Price cannot be negative
  },
  category: {
    type: String,
    required: true,
    trim: true, // Remove whitespace
  },
  stock: {
    type: Number,
    required: true,
    min: 0, // Stock cannot be negative
  },
  imageUrl: {
    type: String,
    required: true,
    trim: true, // Remove whitespace
  },
  createdAt: {
    type: Date,
    default: Date.now, // Set default to the current date
  },
  updatedAt: {
    type: Date,
    default: Date.now, // Set default to the current date
  },
});

// Middleware to update the updatedAt field before saving
ProductSchema.pre<IProduct>("save", function (next) {
  this.updatedAt = new Date();
  next();
});

// Create and export the product model
const Product = mongoose.model<IProduct>("Product", ProductSchema);
export default Product;
