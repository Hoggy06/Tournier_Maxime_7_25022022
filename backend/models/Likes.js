import { Sequelize, DataTypes } from "@sequelize/core";
const sequelize = new Sequelize();
export const Like = sequelize.define(
  "Like",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    idUser: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    idPost: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    isLike: {
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
