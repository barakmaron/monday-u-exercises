'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {    
    await queryInterface.addColumn('Items', 'status',{
      defaultValue: false,
      type: Sequelize.BOOLEAN 
    });
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.removeColumn('Items', 'status');
  }
};
