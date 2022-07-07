'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.addColumn('Items', 'done', 
     {
      allowNull: true,
      type: 'TIMESTAMP'
    });
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.removeColumn('Items', 'done');
  }
};
