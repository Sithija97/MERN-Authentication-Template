import mongoose from "mongoose";

export const conncetDB = async () => {
  try {
    await mongoose
      .connect(process.env.DB_URI)
      .then(() => console.log(`MongoDB connected successfully`));
  } catch (error) {
    console.log(error);
  }
};
