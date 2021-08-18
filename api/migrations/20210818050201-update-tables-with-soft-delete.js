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
      'deletedAt',
      {
        defaultValue: null,
        allowNull: true,
        type: Sequelize.DATE
      }
    ),
    await queryInterface.addColumn(
      'Categorias',
      'deletedAt',
      {
        defaultValue: null,
        allowNull: true,
        type: Sequelize.DATE
      }
    )
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn('Videos', 'deletedAt')
    await queryInterface.removeColumn('Categorias', 'deletedAt')
  }
};
