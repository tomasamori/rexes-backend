import { DataTypes } from "sequelize";
import { sequelize } from "../database";

export const User = sequelize.define("Users", {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  email: { type: DataTypes.STRING, allowNull: false },
  password: { type: DataTypes.STRING, allowNull: false },
  name: { type: DataTypes.STRING, allowNull: false },
  deleted: { type: DataTypes.BOOLEAN, defaultValue: 0, allowNull: false },
});
