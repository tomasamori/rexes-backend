import { sequelize } from "./database";

async function main() {
  try {
    console.log('execute');
    await sequelize.sync({ force: true });
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  }
}

main();
