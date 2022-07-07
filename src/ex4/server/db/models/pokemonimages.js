'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class PokemonImages extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      models.PokemonImages.belongsTo(models.PokemonData, {
        foreignKey: 'pokemon_id'
      });
    }
  }
  PokemonImages.init({
    pokemon_id: DataTypes.INTEGER,
    image: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'PokemonImages',
  });
  return PokemonImages;
};