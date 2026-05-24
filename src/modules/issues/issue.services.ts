import db from "../../config/database";

const issueService = {
  getIssues: async () => {
    const query = `SELECT * FROM issues`;

    const [rows] = await db.execute(query);

    return rows;
  },

  getIssueById: async (id: number) => {
    const query = `SELECT * FROM issues WHERE id = ?`;
    const values = [id];

    const [rows] = await db.execute(query, values);

    return rows;
  },
};

export default issueService;
