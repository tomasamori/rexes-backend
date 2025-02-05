// Upgrade for the future: use a library for validations

import { Request, Response } from "express";

import { operationRepository } from "../repositories/operation.repository";

export const getAllOperations = async (req: Request, res: Response) => {
  try {
    const operations = await operationRepository.findAll();
    res.status(200).json(operations);
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ message: "An error occurred while fetching the operations." });
  }
};

export const getOperationById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    if (!id) {
      res.status(400).json({ message: "Missing required parameter: id" });
      return;
    }

    const operation = await operationRepository.findOne({
      where: { id },
    });

    if (!operation) {
      res.status(404).json({ message: "Operation not found." });
      return;
    }

    res.status(200).json(operation);
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ message: "An error occurred while fetching the operation." });
  }
};

export const createOperation = async (req: Request, res: Response) => {
  try {
    const { operationTimestamp, amount, type, description } = req.body;

    if (!operationTimestamp || !amount || !type) {
      res.status(400).json({
        message: "Missing required fields (operationTimestamp, amount, type)",
      });
      return;
    }

    const timestampRegex =
      /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}(?:\.\d{1,3})?Z$/;

    if (!timestampRegex.test(operationTimestamp)) {
      res.status(400).json({
        message:
          "Invalid operationTimestamp format. Expected format: YYYY-MM-DDTHH:MM:SS.sssZ",
      });
      return;
    }

    if (type !== "income" && type !== "expense") {
      res.status(400).json({
        message: "The type field must be either 'income' or 'expense'.",
      });
      return;
    }

    if (amount && isNaN(amount)) {
      res.status(400).json({ message: "The amount field must be a number." });
      return;
    }

    const newOperation = await operationRepository.create({
      operationTimestamp,
      amount,
      type,
      description,
    });

    res
      .status(201)
      .json({ message: "Operation created successfully.", newOperation });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ message: "An error occurred while creating the operation." });
  }
};

export const updateOperation = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { operationTimestamp, amount, type, description } = req.body;

    if (!id) {
      res.status(400).json({ message: "Missing required parameter: id" });
      return;
    }

    if (!operationTimestamp && !amount && !type && !description) {
      res.status(400).json({
        message: "You must provide at least one field to update.",
      });
      return;
    }

    const operation = await operationRepository.findOne({ where: { id } });

    if (!operation) {
      res.status(404).json({ message: "Operation not found." });
      return;
    }

    if (operationTimestamp) {
      const timestampRegex =
        /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}(?:\.\d{1,3})?Z$/;

      if (!timestampRegex.test(operationTimestamp)) {
        res.status(400).json({
          message:
            "Invalid operationTimestamp format. Expected format: YYYY-MM-DDTHH:MM:SS.sssZ",
        });
        return;
      }
    }

    if (type && type !== "income" && type !== "expense") {
      res.status(400).json({
        message: "The type field must be either 'income' or 'expense'.",
      });
      return;
    }

    if (amount && isNaN(amount)) {
      res.status(400).json({ message: "The amount field must be a number." });
      return;
    }

    const updatedOperation = await operationRepository.update(
      { operationTimestamp, amount, type, description },
      { where: { id }, individualHooks: true }
    );

    res.status(200).json({ message: "Operation updated successfully." });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ message: "An error occurred while updating the operation." });
  }
};

export const deleteOperation = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    if (!id) {
      res.status(400).json({ message: "Missing required parameter: id" });
      return;
    }

    const deletedOperation = await operationRepository.destroy({
      where: { id },
    });

    if (!deletedOperation) {
      res.status(404).json({ message: "Operation not found." });
      return;
    }

    res.status(204).json({ message: "Operation deleted successfully." });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ message: "An error occurred while deleting the operation." });
  }
};
