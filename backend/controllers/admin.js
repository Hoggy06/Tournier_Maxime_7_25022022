const dotenv = require("dotenv");
dotenv.config();
const { Sequelize, DataTypes } = require("sequelize");
const { sequelize } = require("../config/database.js");
const Users = require("../models/Users.js")(sequelize, DataTypes);
const Roles = require("../models/Roles.js")(sequelize, DataTypes);

exports.setAdmin = (req, res) => {
  Users.findOne({
    where: { id: req.params.id },
  })
    .then((user) => {
      if (user.id == req.auth.userId) {
        //console.log(req.auth.userId);
        return res.status(400).json({ message: "Admin déjà ajouté" });
      } else {
        Roles.create({ userId: req.params.id, isAdmin: true })
          //On joint les datas de Users
          .then(() => {
            res.status(200).json({ message: "Admin ajouté" });
          })
          .catch((error) => {
            res.status(400).json({ error });
          });
      }
    })
    .catch((error) => {
      res.status(404).json({ error });
    });

  /*try {
    const userId = req.params.id;

    const users = await Users.findByPk(userId);
    if (!users) throw { message: "Utilisateur non trouvé" };

    const alreadyAdmin = await Roles.findOne({
      where: { userId },
    });

    if (alreadyAdmin) {
      await alreadyAdmin.destroy();
      res.status(201).send({ admin: "Admin enlevé" });
      if (!alreadyAdmin) {
        await Roles.create({ userId, isAdmin: true });
        res.status(200).send({ admin: "Admin ajouté" });
      }
    } else {
      return res.status(403).send({ admin: "Accès non autorisé" });
    }
  } catch (error) {
    return res.status(404).json(error);
  }*/
};
