//Importation de Sequelize et des modèles
const { Sequelize, DataTypes } = require("sequelize");
const Comments = require("../models/Comments.js");
const Likes = require("../models/Likes.js");
const Posts = require("../models/Posts.js");
const Users = require("../models/Users.js");
const dotenv = require("dotenv");
dotenv.config();
//Instancie sequelize + infos bdd
const sequelize = new Sequelize(
  process.env.DATABASE,
  process.env.USER,
  process.env.PASSWORD,
  {
    host: process.env.HOST,
    dialect: process.env.DIALECT,
    port: process.env.PORT,
    logging: false,
  }
);
//Utilisation des modèles pour la sync
const commentsModel = Comments(sequelize, DataTypes);
const likesModel = Likes(sequelize, DataTypes);
const postsModel = Posts(sequelize, DataTypes);
const usersModel = Users(sequelize, DataTypes);

//Connexion bdd
function connectToDatabase(err) {
  if (err) {
    console.error(err);
  } else {
    sequelize.authenticate();
    console.log("Connection to database has been established successfully");
  }
}
//Sync de la bdd
function sync(err) {
  if (err) {
    console.log(err);
  } else {
    sequelize
      .sync({ alter: true })
      .then(() => console.log("Synchronization was successfull"));
  }
}

module.exports = { sequelize, connectToDatabase, sync };
