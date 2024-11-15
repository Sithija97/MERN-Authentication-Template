import { Document } from "mongoose";

export interface UserDocument extends Document {
  email: string;
  password: string;
  verified: string;
  createdAt: Date;
  updatedAt: Date;
  comparePassword(val: string): Promise<boolean>;
}
