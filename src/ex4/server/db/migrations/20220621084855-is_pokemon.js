'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
     await queryInterface.addColumn('Items', 'is_pokemon', 
     {
        type: Sequelize.DataTypes.BOOLEAN
    });
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.removeColumn('Items', 'is_pokemon');
  }
};
