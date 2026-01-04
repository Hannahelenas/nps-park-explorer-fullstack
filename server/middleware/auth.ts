import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

interface AuthRequest extends Request {
  user?: {
    id: string;
  };
}

export const authMiddleware = (
  req: AuthRequest,
  res: Response,
  next: NextFunction
) => {
  // Get JWT from HttpOnly cookie
  const token = req.cookies?.token;

  if (!token) {
    return res.status(401).json({ error: "Not authenticated" });
  }

  try {
    // Verify JWT
    const decoded = jwt.verify(token, process.env.JWT_SECRET!) as {
      userId: string;
    };

    req.user = { id: decoded.userId };

    next();
  } catch (err) {
    return res.status(401).json({ error: "Invalid or expired token" });
  }
};
