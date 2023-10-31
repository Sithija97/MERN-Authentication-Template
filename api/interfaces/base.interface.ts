import { Request } from "express";
export interface CustomRequest extends Request {
  user: {
    _id: string;
    username: string;
    email: string;
    password: string;
    photo: string;
  };
}
export interface IError extends Error {
  message: string;
  name: string;
  kind: string;
  stack: any;
}
