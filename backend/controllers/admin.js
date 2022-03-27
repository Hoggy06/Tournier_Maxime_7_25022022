const dotenv = require("dotenv");
dotenv.config();
const { Sequelize, DataTypes } = require("sequelize");
const { sequelize } = require("../config/database.js");
const Users = require("../models/Users.js")(sequelize, DataTypes);

exports.setAdmin = (req, res) => {
  Users.findOne({
    where: { id: req.params.id },
  })
    .then((user) => {
      if (req.auth.userId && req.auth.isAdmin === true) {
        if (user.isAdmin === false) {
          Users.update({ isAdmin: true }, { where: { id: req.params.id } });
          res
            .status(200)
            .json({ message: "Cet utilisateur est maintenant administrateur" });
        } else {
          Users.update({ isAdmin: false }, { where: { id: req.params.id } });
          res
            .status(200)
            .json({ message: "Cet utilisateur n'est plus administrateur" });
        }
      } else {
        return res.status(403).json({ error: "Accès non autorisé" });
      }
    })
    .catch((error) => {
      res.status(404).json({ error });
    });
};
