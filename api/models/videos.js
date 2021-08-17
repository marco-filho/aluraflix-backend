'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Videos extends Model {
    static associate(models) {
      Videos.belongsTo(models.Categorias, {
        foreignKey: 'categoriaId'
      })
    }
  };
  Videos.init({
    titulo: DataTypes.STRING,
    descricao: DataTypes.TEXT,
    url: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Videos',
  });
  return Videos;
};