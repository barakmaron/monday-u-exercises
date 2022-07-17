const SCHEMA_ID = {
    id: {
        in: ['params', 'query'],
        errorMessage: 'ID is wrong',
        isInt: true
    }
};

const SCHEMA_TASK = {
    task: {
        in: ['body', 'query', 'params'],
        errorMessage: 'Task is wrong',
        isLength: {
            errorMessage: `Task cant be empty`,
            options: { min: 1 }
        }
    }
}

module.exports = {
    SCHEMA_ID,
    SCHEMA_TASK
}
