import { IUser } from "../interfaces/index.js";
import User from "../models/user.model.js";

export const fidUserByEmailOrUsername = async (
  email: string,
  username: string
) => {
  return await User.findOne({ $or: [{ username }, { email }] });
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
