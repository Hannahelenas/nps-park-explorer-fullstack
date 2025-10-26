import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";
import authRoutes from "./routes/auth";
import userRoutes from "./routes/users";
import { initDB } from "./db";

dotenv.config();
const app = express();

app.use(express.json());
app.use(cookieParser());
app.use(cors({ origin: "http://localhost:5173", credentials: true }));

// Routes
app.use("/api", authRoutes);
app.use("/api/users", userRoutes);

// Start server
const startServer = async () => {
  await initDB();

  const port = parseInt(process.env.PORT || "3001", 10);
  app.listen(port, () => console.log(`Server running on port ${port}`));
};

startServer();
