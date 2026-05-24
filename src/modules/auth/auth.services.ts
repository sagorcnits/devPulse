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
  updateUser: async (id: number, user: TUser) => {
    const query = `UPDATE users SET name = ?, role= ?,  password = ? WHERE id = ?`;
    const values = [user.name, user?.role, user.password, id];

    const [rows] = await db.execute(query, values);

    return rows;
  },
};

export default authService;
