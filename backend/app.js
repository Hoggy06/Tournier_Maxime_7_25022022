//constation des dependances
const dotenv = require("dotenv");
dotenv.config();
const express = require("express");
const path = require("path");
const helmet = require("helmet");
const { connectToDatabase, sync } = require("./config/database.js");

const userRoutes = require("./routes/user.js");

//Utilisation d'express
const app = express();
//Protection des en-tetes headers
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy());
app.use(helmet.crossOriginResourcePolicy({ policy: "same-site" }));
app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }));
//CORS
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content, Accept, Content-Type, Authorization"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, DELETE, PATCH, OPTIONS"
  );
  next();
});

connectToDatabase();
sync();

app.use(express.json());

//Middleware pour le dossier images
app.use("/images", express.static(path.join(__dirname, "images")));

//Middleware pour l'authentification
app.use("/api/auth", userRoutes);

module.exports = app;
