import bcrypt from "bcrypt";

export const hashPassword = async (password: string) => {
  const saltRounds = 10;
  const hashedPasword = await bcrypt.hash(password, saltRounds);
  return hashedPasword;
};

export const comparePassword = async (
  password: string,
  hashedPasword: string
) => {
  return await bcrypt.compare(password, hashedPasword);
};
