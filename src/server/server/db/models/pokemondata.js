'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class PokemonData extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      models.PokemonData.belongsTo(models.Items, {
        foreignKey: 'items_id'
      });
      models.PokemonData.PokemonImages = models.PokemonData.hasMany(models.PokemonImages, {
        foreignKey: 'pokemon_id'
      });
    }
  }
  PokemonData.init({
    items_id: DataTypes.INTEGER,
    pokemon_id: DataTypes.INTEGER
  }, {
    freezeTableName: true,
    sequelize,
    modelName: 'PokemonData',
  });
  return PokemonData;
};