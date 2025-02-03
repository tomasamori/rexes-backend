import { sequelize } from "../database";
import User from "../models/User";

export const userRepository = sequelize.getRepository(User);
