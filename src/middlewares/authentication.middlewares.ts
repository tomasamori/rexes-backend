import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

import { userRepository } from "../repositories/user.repository";

interface DecodedToken {
  id: number;
}

export const verifyToken = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const authorizationHeader = req.headers.authorization;
    if (!authorizationHeader) {
      res.status(401).json({ message: "Token not provided." });
      return;
    }

    const token = authorizationHeader.split(" ")[1];
    if (!token) {
      res.status(401).json({ message: "Malformed token." });
      return;
    }

    const secret = process.env.JWT_SECRET;
    if (!secret) {
      console.error("JWT_SECRET is not defined in the environment variables.");
      res.status(500).json({ message: "Internal server error." });
      return;
    }

    const decoded = jwt.verify(token, secret) as DecodedToken;
    if (!decoded) {
      res.status(401).json({ message: "Invalid token." });
      return;
    }

    next();
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error." });
  }
};

export const isAdmin = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader) {
      res.status(401).json({ message: "Token not provided." });
      return;
    }

    const token = authHeader.split(" ")[1];
    if (!token) {
      res.status(401).json({ message: "Malformed token." });
      return;
    }

    const secret = process.env.JWT_SECRET;
    if (!secret) {
      console.error("JWT_SECRET is not defined in environment variables.");
      res.status(500).json({ message: "Internal server error." });
      return;
    }

    const decoded = jwt.verify(token, secret) as { id: number } | null;
    if (!decoded || !decoded.id) {
      res.status(401).json({ message: "Invalid token." });
      return;
    }

    const user = await userRepository.findOne({ where: { id: decoded.id } });
    if (!user) {
      res.status(404).json({ message: "User not found." });
      return;
    }

    if (user.role !== "admin") {
      res.status(403).json({ message: "You do not have permission." });
      return;
    }

    next();
  } catch (error) {
    console.error("Error in isAdmin middleware:", error);
    res
      .status(500)
      .json({ message: "An error occurred while verifying the token." });
  }
};
