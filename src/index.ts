import { sequelize } from "./database";

import "./models/User";
import "./models/Circle";
import "./models/UserCircle";
import "./models/Operation";

async function main() {
  try {
    await sequelize.sync({ force: true });
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  }
}

main();
