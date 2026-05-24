import bcrypt from "bcryptjs";

const generateHasPassword = (password: string) => {
  const salt = bcrypt.genSaltSync(10);
  const hash = bcrypt.hashSync(password, salt);
  return hash;
};

export { generateHasPassword };
