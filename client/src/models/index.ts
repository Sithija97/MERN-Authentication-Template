export type registerInputs = {
  username: string;
  email: string;
  password: string;
};

export type loginInputs = { email: string; password: string };

export type userUpdateInputs = {
  username?: string;
  photo?: string;
};

export type changePasswordInputs = {
  oldPassword: string;
  password: string;
};
