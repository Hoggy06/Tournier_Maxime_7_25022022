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

  const usersModel = Users(sequelize, DataTypes);

  sequelize
    .sync({ force: true })
    .then(() => console.log("Sync accomplished succesfully !"));

  connectToDatabase();
}
