export interface IUser {
  _id?: string; // Optional, will be assigned by MongoDB
  username: string;
  email: string;
  password: string;
  refreshToken?: string;
  otp?: string;
  email_verified?: boolean;
  createdAt?: Date;
  updatedAt?: Date;
}
