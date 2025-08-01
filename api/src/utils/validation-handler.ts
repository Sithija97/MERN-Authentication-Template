import { Request, Response } from "express";
import { validationResult } from "express-validator";

export const isFieldErrorFree = async (req: Request, res: Response) => {
  const errors = await validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
};
