import { Router, Request, Response } from "express";
import { pool } from "../db";
import bcrypt from "bcrypt";

const router = Router();

// Create user (registration)
router.post("/", async (req: Request, res: Response) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ error: "Email and password are required." });
  }

  try {
    const saltRounds = 10;
    const password_hash = await bcrypt.hash(password, saltRounds);

    const result = await pool.query(
      `INSERT INTO users (email, password_hash) VALUES ($1, $2) RETURNING id, email`,
      [email, password_hash]
    );

    res.status(201).json({
      message: "User created successfully",
      user: result.rows[0],
    });
  } catch (err: any) {
    console.error("Error creating user:", err);
    if (err.code === "23505") {
      return res.status(409).json({ error: "This email already exists." });
    }
    res
      .status(500)
      .json({ error: "Internal server error during registration." });
  }
});

export default router;
