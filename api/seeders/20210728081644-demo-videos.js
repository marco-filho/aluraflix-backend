'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('Videos', [{
      titulo: 'O Coronavírus Explicado & O Que Você Deve Fazer',
      descricao: 'O que acontece quando ele infecta um humano e o que nós todos devemos fazer?',
      url: 'BtN-goy9VOY',
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      titulo: 'What Are You Doing With Your Life? The Tail End',
      descricao: 'Let us take a step back and take a look at your life from the outside.',
      url: 'JXeJANDKwDc',
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      titulo: 'Buraco Negro | Nerdologia',
      descricao: 'Neste episódio do Nerdologia vamos ser sugados para dentro de um BURACO NEGRO!',
      url: 'ThG5RHBR7dA',
      createdAt: new Date(),
      updatedAt: new Date()
    },], {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Videos', null, {});
  }
};
