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
const { encryptEmail } = require("../middlewares/crypto.js");

//Fonction signup
exports.signup = (req, res, next) => {
  if (
    req.body.firstname === "" ||
    req.body.lastname === "" ||
    req.body.email === "" ||
    req.body.password === ""
  ) {
    return res.status(400).send({
      error: `Tous les champs doivent etre complétés`,
    });
  }
  let regexFirstName = /^[a-zA-Z\s-]{3,35}$/;
  if (
    regexFirstName.test(req.body.firstname) === false ||
    req.body.firstname == ""
  ) {
    return res.status(400).send({
      error: `Merci de vérifier votre prénom, 3 caractères minimum requis avec des lettres uniquement`,
    });
  }
  let regexLastName = /^[a-zA-Z\s-]{3,35}$/;
  if (
    regexLastName.test(req.body.lastname) === false ||
    req.body.lastname == ""
  ) {
    return res.status(400).send({
      error: `Merci de vérifier votre nom, 3 caractères minimum requis avec des lettres uniquement`,
    });
  }

  let regexEmail = /^([a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6})*$/;

  if (regexEmail.test(req.body.email) === false || req.body.email == "") {
    return res.status(400).send({
      error: `Erreur email non valide !`,
    });
  }
  if (!schemaPassword.validate(req.body.password)) {
    return res.status(400).send({
      error: `Le mot de passe doit contenir au moins : 8 caractères minimum, une majuscule, une minuscule, un chiffre, et aucun espace`,
    });
  }
  bcrypt
    .hash(req.body.password, 10)
    .then((hash) => {
      User.create({
        firstname: req.body.firstname,
        lastname: req.body.lastname,
        email: encryptEmail(req.body.email),
        password: hash,
        image: "http://localhost:3307/images/default.png",
        isAdmin: false,
      })
        .then(() =>
          res.status(201).json({ message: "Compte crée avec succès" })
        )
        .catch(() => res.status(400).json({ error: "Email déjà utilisé" }));
    })
    .catch((error) => res.status(500).json({ error }));
};

//Fonction login
exports.login = (req, res, next) => {
  //Recherche de User dans la bdd
  User.findOne({
    where: { email: encryptEmail(req.body.email) },
  })
    //Si non trouvé 401
    .then((user) => {
      if (!user) {
        return res
          .status(401)
          .send({ error: `Adresse mail ou mot de passe incorrect` });
      }
      //Utilisation de bcrypt pour la comparaison du mot de passe
      bcrypt
        .compare(req.body.password, user.password)
        //Si invalide 401
        .then((valid) => {
          if (!valid) {
            return res
              .status(401)
              .send({ error: `Adresse mail ou mot de passe incorrect` });
          }
          //sinon 200 + création d'un token valable 1 semaine
          const maxAge = 1 * (168 * 60 * 60 * 1000);
          res.status(200).json({
            userId: user.id,
            isAdmin: user.isAdmin,
            token: jwt.sign(
              { userId: user.id, isAdmin: user.isAdmin },
              process.env.TOKEN_KEY,
              {
                expiresIn: maxAge,
              }
            ),
          });
        })
        .catch((error) => res.status(500).json({ error }));
    })
    //Gestion de l'erreur en 500 (server response)
    .catch((error) => res.status(500).json({ error }));
};
