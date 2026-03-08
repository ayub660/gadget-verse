import { dbConnect } from "@/lib/mongodb";
import { NextResponse } from "next/server";
import { ObjectId } from "mongodb";

// 1. All product GET method 
export async function GET() {
  try {
    const db = await dbConnect();
    const products = await db.collection("products").find({}).toArray();
    return NextResponse.json(products);
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

// 2 new product POST save kora 
export async function POST(req) {
  try {
    const body = await req.json();
    const db = await dbConnect();
    const result = await db.collection("products").insertOne(body);
    return NextResponse.json({ message: "Product Added", id: result.insertedId }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}