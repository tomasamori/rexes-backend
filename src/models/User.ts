import { Optional } from "sequelize";
import {
  Table,
  Column,
  Model,
  DataType,
  IsEmail,
  BeforeCreate,
  BeforeUpdate,
} from "sequelize-typescript";
import bcrypt from "bcrypt";

interface UserAttributes {
  id: number;
  email: string;
  password: string;
  name: string;
  role: string;
  active: boolean;
}

interface UserCreationAttributes
  extends Optional<UserAttributes, "id" | "active"> {}

@Table({
  tableName: "users",
  modelName: "User",
  timestamps: true,
})
export default class User extends Model<
  UserAttributes,
  UserCreationAttributes
> {
  @Column({
    primaryKey: true,
    autoIncrement: true,
    type: DataType.INTEGER,
  })
  declare id: number;

  @IsEmail
  @Column({
    type: DataType.STRING,
    allowNull: false,
    unique: true,
  })
  declare email: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  declare password: string;

  @BeforeUpdate
  @BeforeCreate
  static async hashPassword(instance: User) {
    if (instance.changed("password")) {
      const salt = await bcrypt.genSalt(10);
      instance.password = await bcrypt.hash(instance.password, salt);
    }
  }

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  declare name: string;

  @Column({
    type: DataType.ENUM("admin", "user"),
    allowNull: false,
  })
  declare role: string;

  @Column({
    type: DataType.BOOLEAN,
    allowNull: false,
    defaultValue: true,
  })
  declare active: boolean;
}
