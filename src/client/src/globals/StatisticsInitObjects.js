const COMPLETED_OBJECT = {
    max: {
        days: 0,
        hours: 0,
        minutes: 0
    },
    min: {
        days: 0,
        hours: 0,
        minutes: 0
    },
    average: {
        days: 0,
        hours: 0,
        minutes: 0
    },
    number_completed: 0
};

const CREATED_OBJECT = {
    labels: [],
    datasets: [
        {
            data: []
        },
    ]
};

const POKEMON_OBJECT = {
    labels: [],
    datasets: [
        {
            data: []
        },
    ]
};

module.exports ={ 
    POKEMON_OBJECT,
    COMPLETED_OBJECT,
    CREATED_OBJECT
}