'use strict';

module.exports = (sequelize, DataTypes) => {
  const Users = sequelize.define('users', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    name: DataTypes.STRING,
    type: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING,
  }, {
    timestamps: true
  });

  return Users;
}