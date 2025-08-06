import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config()

const MONGO_URI = process.env.MONGO_URI as string;

console.log("MongoDB URI:", MONGO_URI);

const connectDB = async (): Promise<void> => {
  if (mongoose.connection.readyState === 1) {
    // Already connected
    return;
  }

  try {
    await mongoose.connect(MONGO_URI);
    console.log("MongoDB connected");
  } catch (err: any) {
    console.error("MongoDB connection error:", err.message);
    process.exit(1);
  }
};

export default connectDB;