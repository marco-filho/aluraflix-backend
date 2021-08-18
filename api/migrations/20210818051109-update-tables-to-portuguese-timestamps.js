'use strict';

let oldCre = 'createdAt', oldUpd = 'updatedAt', oldDel = 'deletedAt'
let newCre = 'criadoEm', newUpd = 'atualizadoEm', newDel = 'excluidoEm'

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
    await queryInterface.renameColumn('Videos', oldCre, newCre);
    await queryInterface.renameColumn('Videos', oldUpd, newUpd);
    await queryInterface.renameColumn('Videos', oldDel, newDel);
    
    await queryInterface.renameColumn('Categorias', oldCre, newCre);
    await queryInterface.renameColumn('Categorias', oldUpd, newUpd);
    await queryInterface.renameColumn('Categorias', oldDel, newDel);
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.renameColumn('Videos', newCre, oldCre);
    await queryInterface.renameColumn('Videos', newUpd, oldUpd);
    await queryInterface.renameColumn('Videos', newDel, oldDel);
    
    await queryInterface.renameColumn('Categorias', newCre, oldCre);
    await queryInterface.renameColumn('Categorias', newUpd, oldUpd);
    await queryInterface.renameColumn('Categorias', newDel, oldDel);
  }
};
