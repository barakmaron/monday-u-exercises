'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {    
    await queryInterface.addColumn('Items', 'is_pokemon',{
      defaultValue: false,
      type: Sequelize.BOOLEAN 
    });
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.removeColumn('Items', 'is_pokemon');
  }
};
