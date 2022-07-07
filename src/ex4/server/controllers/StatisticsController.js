const statisticsService = require('../services/StatisticsService');

async function GetCreatedStatistics(req, res, next){
    try {
        const data = await statisticsService.GetCreatedStatistics();
        return res.status(200).json({
            status: 200,
            data: data
          });
    } catch (err) {
        next(err);
    }
}

async function GetCompletedStatistics(req, res, next){
    try {
        const data = await statisticsService.GetCompletedStatistics();
        return res.status(200).json({
            status: 200,
            data: data
          });
    } catch (err) {
        next(err);
    }
}

async function GetPokemonStatistics(req, res, next){
    try {
        const data = await statisticsService.GetPokemonStatistics();
        return res.status(200).json({
            status: 200,
            data: data
          });
    } catch (err) {
        next(err);
    }
}

module.exports ={
    GetCreatedStatistics,
    GetCompletedStatistics,
    GetPokemonStatistics
}