'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn(
      'Users', 
      'name',
      Sequelize.STRING
    );
  },

  down: async queryInterface => {
    await queryInterface.removeColumn('Users', 'name');
  }
};
