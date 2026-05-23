import db from "../../config/database";
import { TUser } from "./auth.types";

const authModel = {
  createUser: async (user: TUser) => {
    // query
    const values = [user.name, user.email, user.password];
    const query = `INSERT INTO users (name, email, password) VALUES (?, ?, ?)`;

    const [rows] = await db.execute(query, values);
    return rows;
  },
};

export default authModel;
