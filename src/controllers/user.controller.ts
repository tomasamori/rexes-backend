// Upgrade for the future: use a library to validate the email format and other validations

import { Request, Response } from "express";

import { userRepository } from "../repositories/user.repository";

export const getAllUsers = async (req: Request, res: Response) => {
  try {
    const users = await userRepository.findAll({
      attributes: { exclude: ["password"] },
    });
    res.status(200).json(users);
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ message: "An error occurred while fetching the users." });
  }
};

export const getUserById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    if (!id) {
      res.status(400).json({ message: "Missing required parameter: id" });
      return;
    }

    const user = await userRepository.findOne({
      where: { id },
      attributes: { exclude: ["password"] },
    });

    if (!user) {
      res.status(404).json({ message: "User not found." });
      return;
    }

    res.status(200).json(user);
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ message: "An error occurred while fetching the user." });
  }
};

export const createUser = async (req: Request, res: Response) => {
  try {
    const { email, password, name, role } = req.body;

    if (!email || !password || !name || !role) {
      res.status(400).json({
        message: "Missing required fields (name, email, password, role)",
      });
      return;
    }

    const existentUser = await userRepository.findOne({ where: { email } });

    if (existentUser) {
      res.status(400).json({ message: "Email already registered." });
      return;
    }

    const validEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

    if (!validEmail) {
      res.status(400).json({ message: "Invalid email format." });
      return;
    }

    if (role !== "admin" && role !== "user") {
      res.status(400).json({
        message: "The role field must be either 'admin' or 'user'.",
      });
      return;
    }

    const newUser = await userRepository.create({
      email,
      password,
      name,
      role,
    });

    res
      .status(201)
      .json({ message: "User created successfully.", userId: newUser.id });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ message: "An error occurred while creating the user." });
  }
};

export const updateUser = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { email, password, name, role, active } = req.body;

    if (!id) {
      res.status(400).json({ message: "Missing required parameter: id" });
      return;
    }

    if (!email && !password && !name && !role && !active) {
      res.status(400).json({
        message: "You must provide at least one field to update.",
      });
      return;
    }

    const user = await userRepository.findOne({ where: { id } });

    if (!user) {
      res.status(404).json({ message: "User not found." });
      return;
    }

    if (email) {
      const validEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

      if (!validEmail) {
        res.status(400).json({ message: "Invalid email format." });
        return;
      }
      const existentUser = await userRepository.findOne({ where: { email } });

      if (existentUser && existentUser.id !== user.id) {
        res.status(400).json({ message: "Email already registered." });
        return;
      }
    }

    if (role && role !== "admin" && role !== "user") {
      res.status(400).json({
        message: "The role field must be either 'admin' or 'user'.",
      });
      return;
    }

    const updatedUser = await userRepository.update(
      { email, password, name, role, active },
      { where: { id }, individualHooks: true }
    );

    res.status(200).json({ message: "User updated successfully." });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ message: "An error occurred while updating the user." });
  }
};

export const deleteUser = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    if (!id) {
      res.status(400).json({ message: "Missing required parameter: id" });
      return;
    }

    const deletedUser = await userRepository.destroy({ where: { id } });

    if (!deletedUser) {
      res.status(404).json({ message: "User not found." });
      return;
    }

    res.status(204).json({ message: "User deleted successfully." });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ message: "An error occurred while deleting the user." });
  }
};
