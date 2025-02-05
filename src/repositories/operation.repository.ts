import { sequelize } from "../database";
import Operation from "../models/Operation";

export const operationRepository = sequelize.getRepository(Operation);
