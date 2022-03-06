module.exports = (sequelize, DataTypes) => {
  const Roles = sequelize.define(
    "Roles",
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      isAdmin: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
      },
    },
    {
      createdAt: "created",
    }
  );
  return Roles;
};
