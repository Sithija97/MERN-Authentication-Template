import User from "../models/user.model.js";

export const fidUserByEmailOrUsername = async (
  email: string,
  username: string
) => {
  return await User.findOne({ $or: [{ username }, { email }] });
};
