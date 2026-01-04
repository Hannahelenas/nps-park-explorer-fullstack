import { Pool } from "pg";
import dotenv from "dotenv";
import path from "path";

// Load the appropriate .env file based on the current environment
const envFile =
  process.env.NODE_ENV === "production" ? ".env.prod" : ".env.dev";
dotenv.config({
  path: path.resolve(process.cwd(), envFile),
});

const connectionString =
  process.env.NODE_ENV === "production"
    ? process.env.PROD_DATABASE_URL
    : process.env.DEVELOP_DATABASE_URL;

if (!connectionString) throw new Error("Database URL not set");

/* console.log(
  `Using ${
    process.env.NODE_ENV === "production" ? "PRODUCTION" : "DEVELOPMENT"
  } database:`
);
*/
export const pool = new Pool({
  connectionString,
  ssl: {
    rejectUnauthorized: false,
  },
});

export const initDB = async () => {
  try {
    const client = await pool.connect();

    const res = await client.query("SELECT NOW() AS current_time");
    console.log(
      "PostgreSQL connected! Current time:",
      res.rows[0].current_time
    );

    await client.query(`
      CREATE TABLE IF NOT EXISTS users (
        id SERIAL PRIMARY KEY,
        email VARCHAR(255) UNIQUE NOT NULL,
        password_hash VARCHAR(255) NOT NULL,
        created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
      );
    `);

    console.log("Users table is ready or already existed.");
    client.release();
  } catch (err) {
    console.error("Failed to initialize DB:", err);
    process.exit(1);
  }
};
