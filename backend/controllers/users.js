const dotenv = require("dotenv");
dotenv.config();
const { Sequelize, DataTypes } = require("sequelize");
const { sequelize } = require("../config/database.js");
const User = require("../models/Users.js")(sequelize, DataTypes);
const {
  decryptEmail,
  EMAIL_CRYPTOJS_KEY,
} = require("../middlewares/crypto.js");

exports.editUser = (req, res, next) => {
  User.findOne({ where: { id: req.params.id } })
    .then((user) => {
      if (user.id !== req.auth.userId) {
        return res.status(403).json({ error: "Accès non autorisé" });
      } else {
        const userObject = req.file
          ? {
              ...JSON.parse(req.body.user),
              avatar: `${req.protocol}://${req.get("host")}/images/avatar/${
                req.file.filename
              }`,
            }
          : { ...req.body };
        user.update(userObject).then((user) => res.status(200).json({ user }));
      }
    })
    .catch((error) => {
      res.status(400).json({ error });
    });
};

exports.getOneUser = (req, res, next) => {
  User.findOne({ id: req.params.id })
    .then((user) => {
      userData = {
        firstname: user.firstname,
        lastname: user.lastname,
        email: decryptEmail(user.email, EMAIL_CRYPTOJS_KEY),
      };
      res.status(200).send({ userData });
    })
    .catch(() => {
      res.status(404).json({ error: "Utilisateur non trouvé" });
    });
};

exports.getAllUsers = (req, res, next) => {
  const options = {
    limit: 10,
    order: [["id", "DESC"]],
  };

  User.findAll(options)
    .then((users) => {
      res.status(200).json({ users });
    })
    .catch(() =>
      res.status(400).json({ error: "Impossible de trouver les utilisateurs" })
    );
};

exports.deleteOneUser = (req, res, next) => {
  User.findOne({ where: { id: req.params.id } })
    .then((user) => {
      if (user.id !== req.auth.userId) {
        return res.status(403).json({ error: "Accès non autorisé" });
      } else {
        user.destroy();
        res.status(200).json({ message: "Compte supprimé" });
      }
    })
    .catch((error) => {
      console.log(error);
      res.status(404).json({ error: "Utilisateur non trouvé" });
    });
};
