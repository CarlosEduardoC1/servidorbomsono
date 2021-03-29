'use strict';

module.exports = (sequelize, DataTypes) => {
  const Estoque = sequelize.define('produtos', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    name: DataTypes.STRING,
    codigo: DataTypes.STRING,
    descricao: DataTypes.STRING,
    pcomp: DataTypes.DECIMAL(6,2),
    pven: DataTypes.DECIMAL(6,2),
    grupo: DataTypes.STRING,
    quantidade: DataTypes.INTEGER,
    obs: DataTypes.STRING,
    operador: DataTypes.STRING,
  }, {
    timestamps: true
  });

  return Estoque;
}