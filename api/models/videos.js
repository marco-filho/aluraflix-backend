'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Videos extends Model {
    static associate(models) {
      // define association here
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