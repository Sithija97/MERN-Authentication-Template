export interface IUser {
  _id?: string; // Optional, will be assigned by MongoDB
  username: string;
  email: string;
  password: string;
  refreshToken?: string;
  otp?: number;
  email_verified?: boolean;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface CustomError extends Error {
  statusCode?: number;
  status?: string;
}
