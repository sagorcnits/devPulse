import cors from "cors";
import dotenv from "dotenv";
import express from "express";

import { errorHandler, notFound } from "./middleware/errorHandler";
import authRoutes from "./modules/auth/auth.routes";
import issueRoutes from "./modules/issues/issue.routes";

dotenv.config();

const app = express();

// middlewares
app.use(cors());
app.use(express.json());

// routes
app.use("/auth", authRoutes);
app.use("/issues", issueRoutes);

app.get("/", (req, res) => {
  res.send("API Running 🚀");
});

// not found middleware
app.use(notFound);

// global error handler
app.use(errorHandler);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
