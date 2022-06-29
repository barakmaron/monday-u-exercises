'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Items extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      models.Items.hasOne(models.PokemonData, {
        foreignKey: 'items_id'
      });
    }
  }
  Items.init({
    ItemName: DataTypes.STRING,
    status: DataTypes.BOOLEAN,
    is_pokemon: DataTypes.BOOLEAN,
    done: DataTypes.STRING
  }, {
    sequelize,
    timestamps: true,
    modelName: 'Items',
  });
  return Items;
};