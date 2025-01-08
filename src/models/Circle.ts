import { DataTypes } from "sequelize";
import { sequelize } from "../database";

export const Circle = sequelize.define("Circles", {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  name: { type: DataTypes.STRING, allowNull: false },
  description: { type: DataTypes.STRING },
  deleted: { type: DataTypes.BOOLEAN, defaultValue: 0, allowNull: false },
});
