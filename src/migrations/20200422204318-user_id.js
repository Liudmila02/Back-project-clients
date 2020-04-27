'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn(
      'Clients', 
      'user_id',
      Sequelize.INTEGER
    );
  },

  down: async queryInterface => {
    await queryInterface.removeColumn('Clients', 'user_id');
  }
};
