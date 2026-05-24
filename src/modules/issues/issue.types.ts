export interface TIssue {
  id?: number;
  title: string;
  description: string;
  status?: "open" | "in_progress" | "resolved";
  type: "bug" | "feature_request";
  reporter_id: number;
  createdAt?: Date;
  updatedAt?: Date;
}
