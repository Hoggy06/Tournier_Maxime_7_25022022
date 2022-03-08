//Imporatation de bcrypt, jsonwebtoken et du model User
//const query = Users.Sequelize;
const dotenv = require("dotenv");
dotenv.config();
const { Sequelize, DataTypes } = require("sequelize");
const { sequelize } = require("../config/database.js");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const schemaPassword = require("../models/passwordValidator.js");
const User = require("../models/Users.js")(sequelize, DataTypes);
const fs = require("fs");

//Fonction signup
exports.signup = (req, res, next) => {
  if (!schemaPassword.validate(req.body.password)) {
    return res.status(400).send({
      message: `Le mot de passe doit contenir au moins : 8 caractères minimum, une majuscule, une minuscule, un chiffre, et aucun espace`,
    });
  }
  bcrypt
    .hash(req.body.password, 10)
    .then((hash) => {
      User.create({
        firstname: req.body.firstname,
        lastname: req.body.lastname,
        email: req.body.email,
        password: hash,
      })
        .then(() => res.status(201).json({ message: "Utilisateur crée !" }))
        .catch(() => res.status(400).json({ error: "Email déjà utilisé" }));
    })
    .catch((error) => res.status(500).json({ error }));
};

//Fonction login
exports.login = (req, res, next) => {
  //Recherche de User dans la bdd
  User.findOne({
    where: { email: req.body.email },
  })
    //Si non trouvé 401
    .then((user) => {
      if (!user) {
        return res.status(401).send({ message: `Utilisateur non trouvé` });
      }

      //Utilisation de bcrypt pour la comparaison du mot de passe
      bcrypt
        .compare(req.body.password, user.password)
        //Si invalide 401
        .then((valid) => {
          if (!valid) {
            return res
              .status(401)
              .send({ message: `Adresse mail ou mot de passe incorrect` });
          }
          //sinon 200 + création d'un token valable 24h
          res.status(200).json({
            userId: user.id,
            token: jwt.sign({ userId: user.id }, process.env.TOKEN_KEY, {
              expiresIn: "24h",
            }),
          });
        })
        .catch((error) => res.status(500).json({ error }));
    })
    //Gestion de l'erreur en 500 (server response)
    .catch((error) => res.status(500).json({ error }));
};
