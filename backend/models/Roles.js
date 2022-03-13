module.exports = (sequelize, DataTypes) => {
  const Roles = sequelize.define(
    "Roles",
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      isAdmin: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
      },
    },
    {
      createdAt: "created",
      updatedAt: false,
    }
  );
  return Roles;
};
