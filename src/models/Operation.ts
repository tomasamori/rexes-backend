import { Optional } from "sequelize";
import {
  Table,
  Column,
  Model,
  DataType,
  DeletedAt,
} from "sequelize-typescript";

interface OperationAttributes {
  id: number;
  operationTimestamp: Date;
  amount: number;
  type: string;
  description: string;
}

interface OperationCreationAttributes
  extends Optional<OperationAttributes, "id"> {}

@Table({
  tableName: "operations",
  modelName: "Operation",
  timestamps: true,
})
export default class Operation extends Model<
  OperationAttributes,
  OperationCreationAttributes
> {
  @Column({
    primaryKey: true,
    autoIncrement: true,
    type: DataType.INTEGER,
  })
  declare id: number;

  @Column({
    type: DataType.DATE,
    allowNull: false,
  })
  declare operationTimestamp: Date;

  @Column({
    type: DataType.DECIMAL(12, 2),
    allowNull: false,
  })
  declare amount: number;

  @Column({
    type: DataType.ENUM("income", "expense"),
    allowNull: false,
  })
  declare type: string;

  @Column({
    type: DataType.STRING,
  })
  declare description: string;

  @DeletedAt
  declare deletedAt: Date;
}
