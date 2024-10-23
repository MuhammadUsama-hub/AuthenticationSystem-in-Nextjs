import { NextResponse } from "next/server";
import Product from "@/models/products";
import { dbConnect } from "@/lib/dbConfig";
import mongoose from "mongoose";

export async function GET(
  req: Request,
  { params }: { params: { id: string } }
) {
  // Ensure the database is connected
  await dbConnect(process.env.MONGO_URI || "");

  // Validate if the provided ID is a valid MongoDB ObjectId
  if (!mongoose.Types.ObjectId.isValid(params.id)) {
    return NextResponse.json({ error: "Invalid product ID" }, { status: 400 });
  }

  try {
    // Fetch the product by the ID from the MongoDB collection
    const product = await Product.findOne({
      _id: new mongoose.Types.ObjectId(params.id),
    });

    if (!product) {
      return NextResponse.json({ error: "Product not found" }, { status: 404 });
    }

    return NextResponse.json(product);
  } catch (error) {
    // Handle any other errors
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
