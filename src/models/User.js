import mongoose from "mongoose";

const UserSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String }, // গুগল লগইনের ক্ষেত্রে এটি খালি থাকতে পারে
    image: { type: String, default: "" },
    role: { type: String, default: "user", enum: ["user", "admin"] },
    provider: { type: String, default: "credentials" },
  },
  { timestamps: true } // এটি অটোমেটিক createdAt এবং updatedAt তৈরি করবে
);

// নেক্সট জেএস-এ মডেল চেক করার এই পদ্ধতিটি ফলো করা জরুরি
export const User = mongoose.models.User || mongoose.model("User", UserSchema);