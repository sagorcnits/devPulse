import db from "../../config/database";
import { TIssue } from "./issue.types";

const issueModel = {
  createIssue: async (issue: TIssue) => {
    // query
    const values = [
      issue.title,
      issue.description,
      issue?.type,
      issue.reporter_id,
    ];
    const query = `INSERT INTO issues (title, description, type, reporter_id) VALUES (?, ?, ?, ?)`;

    const [rows] = await db.execute(query, values);
    return rows;
  },
};

export default issueModel;
