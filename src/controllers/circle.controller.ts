import { Request, Response } from "express";
import { Circle } from "../models/Circle";

export const createCircle = async (req: Request, res: Response) => {
  try {
    const { name, description } = req.body;

    if (!name) {
      res.status(400).json({ message: "Name is required" });
      return;
    }

    const circle = await Circle.create({
      name,
      description,
    });

    res.status(201).json({ message: "Circle created successfully", circle });
  } catch (error) {
    console.error("Error creating circle:", error);
    res
      .status(500)
      .json({ message: "An error occurred while creating the circle" });
  }
};

export const getCircleById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    if (!id) {
      res.status(400).json({ message: "Circle ID is required" });
      return;
    }

    const circle = await Circle.findByPk(id);

    if (!circle) {
      res.status(404).json({ message: "Circle not found" });
      return;
    }

    if (circle.dataValues.deleted) {
      res.status(404).json({ message: "Circle not found" });
      return;
    }

    res.status(200).json({ message: "Circle found", circle });
  } catch (error) {
    console.error("Error getting circle by id:", error);
    res
      .status(500)
      .json({ message: "An error occurred while getting the circle" });
  }
};

export const updateCircleById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { name, description } = req.body;

    if (!id) {
      res.status(400).json({ message: "Circle ID is required" });
      return;
    }

    const circle = await Circle.findByPk(id);

    if (!circle) {
      res.status(404).json({ message: "Circle not found" });
      return;
    }

    if (circle.dataValues.deleted) {
      res.status(404).json({ message: "Circle not found" });
      return;
    }

    if (name) {
      circle.dataValues.name = name;
    }

    if (description) {
      circle.dataValues.description = description;
    }

    await circle.save();

    res.status(200).json({ message: "Circle updated successfully", circle });
  } catch (error) {
    console.error("Error updating circle by id:", error);
    res
      .status(500)
      .json({ message: "An error occurred while updating the circle" });
  }
};

export const deleteCircleById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    if (!id) {
      res.status(400).json({ message: "Circle ID is required" });
      return;
    }

    const circle = await Circle.findByPk(id);

    if (!circle) {
      res.status(404).json({ message: "Circle not found" });
      return;
    }

    await circle.update({ deleted: 1 });

    res.sendStatus(204);
  } catch (error) {
    console.error("Error deleting circle by id:", error);
    res
      .status(500)
      .json({ message: "An error occurred while deleting the circle" });
  }
};
