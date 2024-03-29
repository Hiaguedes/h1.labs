'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
      await queryInterface.bulkInsert('niveis', [
        {
          descr_nivel: 'básico',
          createdAt: new Date(),
          updatedAt: new Date()			
        },
        {
          descr_nivel: 'intermediário',
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          descr_nivel: 'avançado',
          createdAt: new Date(),
          updatedAt: new Date()
        } 
    ], {});
  },

  down: async (queryInterface, Sequelize) => {

     await queryInterface.bulkDelete('pessoas', null, {});
  }
};
