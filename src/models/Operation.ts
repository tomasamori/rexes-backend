import { DataTypes } from "sequelize";
import { sequelize } from "../database";

import { Circle } from "./Circle";

export const Operation = sequelize.define("Operations", {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    operationTimestamp: { type: DataTypes.DATE, allowNull: false },
    amount: { type: DataTypes.DECIMAL, allowNull: false },
    type: { type: DataTypes.ENUM('income', 'expense'), allowNull: false },
    description: { type: DataTypes.STRING }
});

Operation.belongsTo(Circle, { foreignKey: 'circleId', targetKey: 'id' });