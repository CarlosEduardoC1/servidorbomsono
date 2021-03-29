'use strict';

module.exports = (sequelize, DataTypes) => {
  const Vendas = sequelize.define('vendas', {
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
    endereco_cliente: DataTypes.STRING,
    bairro_cliente: DataTypes.STRING,
    fone_cliente_residencia: DataTypes.STRING,
    fone_cliente_celular: DataTypes.STRING,
    cpf: DataTypes.STRING,
    obs: DataTypes.STRING,
    operador: DataTypes.STRING,
    parcelas: DataTypes.INTEGER
  }, {
    timestamps: true
  });

  return Vendas;
}