import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";
import authRoutes from "./routes/auth";
import userRoutes from "./routes/users";
import { initDB } from "./db";

dotenv.config();
const app = express();

const allowedOrigin =
  process.env.NODE_ENV === "production"
    ? "https://parkexplorer.netlify.app"
    : "http://localhost:5173";

app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    origin: allowedOrigin,
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

// Debug-middleware for req body test
app.use((req, res, next) => {
  console.log(`[${req.method}] ${req.url} - Body:`, req.body);
  next();
});

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
