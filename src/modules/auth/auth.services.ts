import db from "../../config/database";
import { TUser } from "./auth.types";

const authService = {
  deleteUser: async (id: number) => {
    const query = `DELETE FROM users WHERE id = ?`;
    const values = [id];

    const [rows] = await db.execute(query, values);

    return rows;
  },

  getUsers: async () => {
    const query = `SELECT * FROM users`;

    const [rows] = await db.execute(query);

    return rows;
  },

  getUserById: async (id: number) => {
    const query = `SELECT * FROM users WHERE id = ?`;
    const values = [id];

    const [rows] = await db.execute(query, values);

    return rows;
  },

  getUserByEmail: async (email: string) => {
    const query = `SELECT * FROM users WHERE email = ?`;
    const values = [email];

    const [rows] = await db.execute(query, values);

    return rows;
  },

  updateUser: async (id: number, user: Partial<TUser>) => {
    const fields: string[] = [];
    const values: any[] = [];

    if (user.name) {
      fields.push("name = ?");
      values.push(user.name);
    }

    if (user.role) {
      fields.push("role = ?");
      values.push(user.role);
    }

    if (user.password) {
      fields.push("password = ?");
      values.push(user.password);
    }

    if (fields.length === 0) {
      throw new Error("No fields provided for update");
    }

    values.push(id);

    const query = `
    UPDATE users
    SET ${fields.join(", ")}
    WHERE id = ?
  `;

    const [rows] = await db.execute(query, values);

    return rows;
  },
};

export default authService;
