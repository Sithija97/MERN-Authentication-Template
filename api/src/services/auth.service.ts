export type CreateAccountParams = {
  email: string;
  password: string;
  userAgent: string;
};

export const createAccount = async (data: CreateAccountParams) => {
  // verify exisiting user
  // create user
  // create verification code
  // send verification email
  // create session
  // sign access token & refresh token
  // return user & tokens
};
