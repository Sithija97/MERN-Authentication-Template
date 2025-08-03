import { Document } from "mongoose";
import { IUser } from "../interfaces/index.js";
import User from "../models/user.model.js";

export const findUser = async ({
  id,
  email,
  username,
}: {
  id?: string;
  email?: string;
  username?: string;
}) => {
  const query: any = {};
  if (id) query._id = id;
  if (email) query.email = email;
  if (username) query.username = username;

  return await User.findOne({
    $or: [
      id ? { _id: id } : null,
      email ? { email } : null,
      username ? { username } : null,
    ].filter(Boolean),
  });
};

export const createOrUpdateUser = async (
  userData: Partial<IUser>,
  updatedData?: IUser
) => {
  if (updatedData && updatedData._id) {
    for (const key in userData) {
      if (userData[key] !== undefined) {
        updatedData[key] = userData[key] as any;
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
