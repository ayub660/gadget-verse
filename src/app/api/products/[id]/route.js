import { dbConnect } from "@/lib/mongodb";
import { NextResponse } from "next/server";
import { ObjectId } from "mongodb";

// ১. নির্দিষ্ট আইডি দিয়ে ডাটা আনা (GET)
export async function GET(req, { params }) {
  try {
    const { id } = await params;
    const db = await dbConnect();
    const product = await db.collection("products").findOne({ _id: new ObjectId(id) });

    if (!product) {
      return NextResponse.json({ error: "Product not found" }, { status: 404 });
    }
    return NextResponse.json(product);
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

// ২. নির্দিষ্ট আইডি দিয়ে ডাটা ডিলিট করা (DELETE)
export async function DELETE(req, { params }) {
  try {
    const { id } = await params;
    const db = await dbConnect();
    const result = await db.collection("products").deleteOne({ _id: new ObjectId(id) });

    if (result.deletedCount === 1) {
      return NextResponse.json({ message: "Product deleted" }, { status: 200 });
    }
    return NextResponse.json({ error: "Product not found" }, { status: 404 });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}