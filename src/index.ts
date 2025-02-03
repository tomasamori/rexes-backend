import { sequelize } from "./database";
import app from "./server";

async function main() {
  try {
    console.log("execute");
    await sequelize.sync({ force: true });
    app.listen(3000);
    console.log("Server running on port", 3000);
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  }
}

main();
