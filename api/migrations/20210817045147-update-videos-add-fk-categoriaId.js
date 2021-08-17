'use strict';

module.exports = {
  /**
  * @typedef {import('sequelize').Sequelize} Sequelize
  * @typedef {import('sequelize').QueryInterface} QueryInterface
  */

 /**
  * @param {QueryInterface} queryInterface
  * @param {Sequelize} Sequelize
  * @returns
  */
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn(
      'Videos',
      'categoriaId',
      {
        defaultValue: 1,
        allowNull: false,
        references: { model: 'Categorias', key: 'id' },
        type: Sequelize.INTEGER
      }
    )
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn('Videos', 'categoriaId')
  }
};
