import mongoose from "mongoose";
import { MONGO_URI } from "../constants/env";

const connectDB = async () => {
  try {
    await mongoose.connect(MONGO_URI);
    console.log("Database connected!");
  } catch (error) {
    console.log("Could not conncet to Database :", error);
    process.exit(1);
  }
};

export default connectDB;
