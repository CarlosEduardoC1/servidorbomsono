'use strict';

module.exports = (sequelize, DataTypes) => {
  const Logs = sequelize.define('logs', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    produto: DataTypes.STRING,
    qnt: DataTypes.INTEGER,
    total: DataTypes.DECIMAL(6,2),
    forma_pagamento: DataTypes.STRING,
    nome_cliente: DataTypes.STRING,
    fone_cliente_celular: DataTypes.STRING,
    cpf: DataTypes.STRING,
    obs: DataTypes.STRING,
    type: DataTypes.STRING,
    operador: DataTypes.STRING,
  }, {
    timestamps: true
  });

  return Logs;
}