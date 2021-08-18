'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Categorias extends Model {
    static associate(models) {
      Categorias.hasMany(models.Videos, {
        foreignKey: 'categoriaId'
      })
    }
  };
  Categorias.init({
    titulo: DataTypes.STRING,
    cor: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Categorias',
    createdAt: 'criadoEm',
    updatedAt: 'atualizadoEm',
    paranoid: true,
    deletedAt: 'excluidoEm'
  });
  return Categorias;
};