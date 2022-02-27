import { Sequelize, DataTypes } from "@sequelize/core";
const sequelize = new Sequelize();
export const Roles = sequelize.define(
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
    timestamps: false,
    createdAt: true,
    updatedAt: false,
  }
);
