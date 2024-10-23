import { NextResponse } from "next/server";
import { dbConnect } from "@/lib/dbConfig";
import Product from "@/models/products";
export async function GET() {
  await dbConnect(process.env.MONGO_URI || "");
  try {
    // Fetch only the product IDs (_id) from the products collection
    const products = await Product.find({}, { _id: 1 });

    const ids = products.map((product) => product._id.toString()); // gets array with id as a string only.

    return NextResponse.json(ids);
  } catch (error) {
    NextResponse.json(
      {
        success: false,
        data: "Internal server error",
      },
      { status: 500 }
    );
  }
}
