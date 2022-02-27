//Connexion à la bdd
import { Sequelize, DataTypes } from "sequelize";
import { Users } from "../models/Users.js";
export function database() {
  const sequelize = new Sequelize(
    process.env.DATABASE,
    process.env.USER,
    process.env.PASSWORD,
    {
      host: process.env.HOST,
      dialect: "mariadb",
      port: process.env.PORT,
      logging: false,
    }
  );
  async function connectToDatabase() {
    try {
      await sequelize.authenticate();
      console.log("Connection has been established successfully.");
    } catch (error) {
      console.error("Unable to connect to the database:", error);
    }
  }

  async function syncUsersModel() {
    const usersModel = new Users(sequelize, DataTypes);
    try {
      await usersModel
        .sync({ force: true })
        .then(() => console.log("Sync accomplished succesfully !"));
    } catch (error) {
      console.error("Unable to sync data", error);
    }
  }

  connectToDatabase();
  syncUsersModel();
}
