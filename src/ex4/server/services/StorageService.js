const { Items } = require('../db/models');

class StorageService {
    GetTasks(){
        return Items.findAll();
    }

    async CreateTask(task){
        return await Items.create({
            'ItemName': task.name,
            'status': false
        });
    }
}

module.exports = new StorageService();