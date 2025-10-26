import { Pool } from "pg";
import dotenv from "dotenv";

dotenv.config();

const connectionString = process.env.DEVELOP_DATABASE_URL;
if (!connectionString) throw new Error("DEVELOP_DATABASE_URL not set");

export const pool = new Pool({ connectionString });

export const initDB = async () => {
  try {
    const client = await pool.connect();

    // Testa anslutning
    const res = await client.query("SELECT NOW() AS current_time");
    console.log(
      "✅ PostgreSQL connected! Current time:",
      res.rows[0].current_time
    );

    // Skapa users-tabellen om den inte finns
    await client.query(`
      CREATE TABLE IF NOT EXISTS users (
        id SERIAL PRIMARY KEY,
        email VARCHAR(255) UNIQUE NOT NULL,
        password_hash VARCHAR(255) NOT NULL,
        created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
      );
    `);
    console.log("✅ Users table is ready or already existed.");

    client.release();
  } catch (err) {
    console.error("❌ Failed to initialize DB:", err);
    process.exit(1);
  }
};
