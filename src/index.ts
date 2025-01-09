import { sequelize } from "./database";
import app from "./app";

async function main() {
  try {
    await sequelize.sync();
    app.listen(3000);
    console.log("Server is listening on port", 3000);
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  }
}

main();
