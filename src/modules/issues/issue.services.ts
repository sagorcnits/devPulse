import db from "../../config/database";
import { TIssue } from "./issue.types";

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

  updateIssue: async (id: number, issue: Partial<TIssue>) => {
    const fields: string[] = [];
    const values: any[] = [];

    if (issue.title) {
      fields.push("title = ?");
      values.push(issue.title);
    }

    if (issue.description) {
      fields.push("description = ?");
      values.push(issue.description);
    }

    if (issue.type) {
      fields.push("type = ?");
      values.push(issue.type);
    }

    if (issue.reporter_id) {
      fields.push("reporter_id = ?");
      values.push(issue.reporter_id);
    }

    if (fields.length === 0) {
      throw new Error("No fields provided for update");
    }

    values.push(id);

    const query = `
    UPDATE issues
    SET ${fields.join(", ")}
    WHERE id = ?
  `;

    const [rows] = await db.execute(query, values);

    return rows;
  },

  deleteIssue: async (id: number) => {
    const query = `DELETE FROM issues WHERE id = ?`;
    const values = [id];

    const [rows] = await db.execute(query, values);

    return rows;
  },
};

export default issueService;
