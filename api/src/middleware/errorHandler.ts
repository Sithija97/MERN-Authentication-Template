import { ErrorRequestHandler, NextFunction, Request, Response } from "express";
import { INTERNAL_SERVER_ERROR } from "../constants/http";

export const errorHandler: ErrorRequestHandler = (
  error: any,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  console.log(`PATH: ${req.path} `, error);
  return res.status(INTERNAL_SERVER_ERROR).send("Internal server Error.");
};
