import { dbConnect } from "@/lib/mongodb";
import bcrypt from "bcryptjs";
import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    
    const { name, email, password, image } = await req.json(); 
    
    const db = await dbConnect();
    const usersCollection = db.collection("users");

    
    const existingUser = await usersCollection.findOne({ email });
    if (existingUser) {
      return NextResponse.json({ message: "User already exists!" }, { status: 400 });
    }

   
    const hashedPassword = await bcrypt.hash(password, 10);

    
    const newUser = {
      name: name || "New User", 
      email,
      password: hashedPassword,
      image: image || "", 
      role: "user",
      createdAt: new Date(),
    };

    await usersCollection.insertOne(newUser);
    return NextResponse.json({ message: "User registered successfully!" }, { status: 201 });

  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}