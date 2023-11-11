import { Document, Types } from "mongoose";

export interface IUser extends Document {
  username: string;
  email: string;
  password: string;
  photo: string;
  authMethod: string;
}
