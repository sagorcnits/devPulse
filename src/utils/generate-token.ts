import jwt from "jsonwebtoken";

import { config } from "../config/config";
import { TUser } from "../modules/auth/auth.types";

const generateToken = (existingUser: TUser) => {
  const token = jwt.sign(
    { id: existingUser?.id, role: existingUser.role },
    config.jwt.secret as string,
    {
      expiresIn: "1h",
    },
  );

  return token;
};

export default generateToken;
