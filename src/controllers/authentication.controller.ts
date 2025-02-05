// Upgrade for the future: use a library to validate the email format and other validations

import { Request, Response } from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

import { userRepository } from "../repositories/user.repository";

export const signIn = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      res
        .status(400)
        .json({ message: "Missing required fields (email, password)" });
      return;
    }

    const validEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

    if (!validEmail) {
      res.status(400).json({ message: "Invalid email format." });
      return;
    }

    const user = await userRepository.findOne({ where: { email } });

    if (!user) {
      res.status(404).json({ message: "User not found." });
      return;
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      res.status(401).json({ message: "Wrong password." });
      return;
    }

    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET || "test", {
      expiresIn: "1h",
    });

    res.status(200).json({ token });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "An error occurred while signing in." });
  }
};
