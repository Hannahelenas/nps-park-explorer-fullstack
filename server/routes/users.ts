import { Router, Request, Response } from "express";
import { pool } from "../db";
import bcrypt from "bcrypt";
import { authMiddleware } from "../middleware/auth";

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

// DELETE current user (with password confirmation)
router.delete("/me", authMiddleware, async (req: any, res: Response) => {
  const { password } = req.body;

  if (!password) {
    return res.status(400).json({ error: "Password is required" });
  }

  try {
    const userId = req.user.id;

    const result = await pool.query(
      "SELECT password_hash FROM users WHERE id = $1",
      [userId]
    );

    const user = result.rows[0];
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    const match = await bcrypt.compare(password, user.password_hash);
    if (!match) {
      return res.status(401).json({ error: "Incorrect password" });
    }

    await pool.query("DELETE FROM users WHERE id = $1", [userId]);

    res.clearCookie("token", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
    });

    res.json({ message: "Account deleted successfully" });
  } catch (err) {
    console.error("Delete account error:", err);
    res.status(500).json({ error: "Failed to delete account" });
  }
});

export default router;
