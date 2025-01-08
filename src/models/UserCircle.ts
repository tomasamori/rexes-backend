import { DataTypes } from "sequelize";
import { sequelize } from "../database";

import { User } from "./User";
import { Circle } from "./Circle";

export const UserCircle = sequelize.define("UsersCircles", {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  role: { type: DataTypes.STRING, allowNull: false },
  deleted: { type: DataTypes.BOOLEAN, defaultValue: 0, allowNull: false },
});

User.belongsToMany(Circle, { through: UserCircle });
Circle.belongsToMany(User, { through: UserCircle });
