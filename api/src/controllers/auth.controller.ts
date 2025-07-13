import { Request, Response } from "express";
import User from "../models/user.model.js";

export const signUpController = async (req: Request, res: Response) => {
  const { username, email, password } = req.body;

  try {
    const data = new User();
    data.usernamee = username;
    data.password = password;
    data.email = email;

    const user = await data.save();

    res.status(201).json({
      error: false,
      data: user,
    });
  } catch (error) {}
};
