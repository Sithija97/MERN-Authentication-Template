import { Document } from "mongoose";
import { IUser } from "../interfaces/index.js";
import User from "../models/user.model.js";

export const findUser = async (
  {
    id,
    email,
    username,
  }: {
    id?: string;
    email?: string;
    username?: string;
  },
  selectField: string[] = []
) => {
  const orConditions = [
    id ? { _id: id } : null,
    email ? { email } : null,
    username ? { username } : null,
  ].filter(Boolean);

  let query = User.findOne({ $or: orConditions });

  if (selectField.length > 0) {
    query = query.select(selectField.join(" "));
  }

  const user = await query;
  return user;
};
export const createOrUpdateUser = async (
  userData: Partial<IUser>,
  updatedData?: IUser
) => {
  if (updatedData && updatedData._id) {
    for (const key in userData) {
      if (userData[key] !== undefined) {
        updatedData[key] = userData[key] as any;
        console.log(updatedData[key]);
        console.log(userData[key]);
      }
    }

    return await User.findByIdAndUpdate(updatedData._id, updatedData, {
      new: true,
      runValidators: true,
    });
  }

  const user = new User(userData);
  return await user.save();
};
