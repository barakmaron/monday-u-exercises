const statisticsController = require('../controllers/StatisticsController');

const express = require('express');
const statistics_route = express.Router();

statistics_route.get('/created', statisticsController.GetCreatedStatistics);
statistics_route.get('/completed', statisticsController.GetCompletedStatistics);
statistics_route.get('/pokemon', statisticsController.GetPokemonStatistics);

module.exports = statistics_route;