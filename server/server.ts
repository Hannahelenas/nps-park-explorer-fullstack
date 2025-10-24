// server/server.ts

import express, { Application, Request, Response } from "express";
import { Pool } from "pg";
import dotenv from "dotenv";
import cors from "cors";
import * as bcrypt from "bcrypt";

dotenv.config();

const app: Application = express();

const connectionString: string = process.env.DEVELOP_DATABASE_URL || "";
const port: number = parseInt(process.env.PORT || "3001", 10);

// Middleweare
app.use(express.json());

// Allow access from frontend local only for now
// TODO implement variables and cors for prod
app.use(
  cors({
    origin: "http://localhost:5173",
  })
);

// Database connetction

// Check if the connection string is set
if (!connectionString) {
  console.error("DEVELOP_DATABASE_URL is not set in the .env file!");
  process.exit(1);
}

const pool = new Pool({
  connectionString: connectionString,
});

// Test connection and run table initialization
pool.connect((err, client, release) => {
  if (err) {
    return console.error("Error connecting to PostgreSQL:", err.stack);
  }

  if (!client) {
    release();
    return console.error("Client could not be retrieved from the pool");
  }

  //Initialization, Create users table (if it doesn't exist)
  client.query(
    `
    CREATE TABLE IF NOT EXISTS users (
      id SERIAL PRIMARY KEY,
      email VARCHAR(255) UNIQUE NOT NULL,
      password_hash VARCHAR(255) NOT NULL, 
      created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
    );
  `,
    (createErr) => {
      if (createErr) {
        console.error("Error creating users table:", createErr.stack);
      } else {
        console.log("Users table is ready or already existed.");
      }

      // Release the client only after all initialization is complete
      release();
      console.log("PostgreSQL connected!");

      // Start Express server after successful DB connection
      app.listen(port, () => {
        console.log(`Express TS-server running on http://localhost:${port}`);
      });
    }
  );
});

// Routes

// Example route (Basic test)
app.get("/", (req: Request, res: Response) => {
  res.send("Express TypeScript Backend is running!");
});

// Test route (Test database access)
app.get("/api/test-db", async (req: Request, res: Response) => {
  try {
    const result = await pool.query("SELECT NOW() AS current_time");
    res.json({
      status: "OK",
      message: "Database query succeeded (via Railway)",
      time: result.rows[0].current_time,
    });
  } catch (err) {
    console.error("Database query failed:", err);
    res.status(500).send("Internal server error fetching time.");
  }
});

// Create user route (Registration)
app.post("/api/users", async (req: Request, res: Response) => {
  // Get email and password from client
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ error: "Email and password are required." });
  }

  try {
    // 1. Create salt and hash
    const saltRounds = 10;
    const password_hash = await bcrypt.hash(password, saltRounds);

    // 2. SQL query
    const sql = `
            INSERT INTO users (email, password_hash) 
            VALUES ($1, $2)
            RETURNING id, email;
        `;
    // Values to send (email and password_hash)
    const values = [email, password_hash];

    const result = await pool.query(sql, values);

    // Send user creation success response
    res.status(201).json({
      message: "User created successfully",
      user: result.rows[0],
    });
  } catch (err: unknown) {
    console.error("Error when creating user:", err);
    if (err && typeof err === "object" && "code" in err) {
      // Errorcode 23505 (unique violation, e.g., email already exists)
      if (err.code === "23505") {
        return res.status(409).json({ error: "This email alredy exists." });
      }
    }
    res
      .status(500)
      .json({ error: "Internal server error during registration." });
  }
});

// Log in route
app.post("/api/login", async (req: Request, res: Response) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ error: "Email or password is missing." });
  }

  try {
    // 1. Find user by email
    const userQuery = await pool.query(
      "SELECT id, email, password_hash FROM users WHERE email = $1",
      [email]
    );

    const user = userQuery.rows[0];

    if (!user) {
      // Use generic message for security
      return res.status(401).json({ error: "Invalid email or password." });
    }

    // 2. Compare password hash
    const passwordMatch = await bcrypt.compare(password, user.password_hash);
    if (!passwordMatch) {
      // Use generic message for security
      return res.status(401).json({ error: "Invalid email or password." });
    }

    // 3. Successful login
    res.status(200).json({
      message: "Login successful",
      user: { id: user.id, email: user.email },
    });
  } catch (err: unknown) {
    console.error("Something went wrong:", err);
    if (err && typeof err === "object" && "message" in err) {
      console.error("Detailed Error:", err.message);
    }
    res.status(500).json({ error: "Internal server error during login." });
  }
});
