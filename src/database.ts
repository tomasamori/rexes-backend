import { Sequelize } from "sequelize";

const database = process.env.DATABASE_NAME || "rexes_test";
const username = process.env.DATABASE_USERNAME || "test";
const password = process.env.DATABASE_PASSWORD;
const host = process.env.DATABASE_HOST || "localhost";

export const sequelize = new Sequelize(database, username, password, {
  host: host,
  dialect: "mysql",
  dialectOptions: {
    useUTC: false,
  },
  timezone: "-03:00",
});

const testDatabaseConnection = async () => {
  try {
    await sequelize.authenticate();
    console.log("Connection has been established successfully.");
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  }
};
