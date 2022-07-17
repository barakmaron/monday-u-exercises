const { Items, PokemonData, PokemonImages, Sequelize, sequelize } = require('../db/models');

class StorageService {
    constructor() {
    }
    async GetTasks(order = null) {
        let order_by = ['ItemName', order];
        if (!order) {
            order_by = ['id', 'ASC'];
        }
        return await Items.findAll({
            include: {
                all: true,
                nested: true
            },
            order: [order_by]
        });
    }

    async CreateTask(task, t = null) {
        return await Items.create({
            'ItemName': task.name,
            'is_pokemon': task.is_pokemon,
            'status': task.status
        }, { transaction: t });
    }

    async CreatePokemonData(data, t = null) {
        return await PokemonData.create({
            'items_id': data.item_id,
            'pokemon_id': data.pokemon_id
        }, { transaction: t });
    }

    async CreatePokemonImages(data, t = null) {
        return await Promise.all(Object.entries(data.images).map(async (image) => {
            return PokemonImages.create({
                'pokemon_id': data.id,
                'image': image[1]
            }, { transaction: t });
        }));
    }

    async DeleteTask(task_id) {
        const task = await Items.findOne({
            where: {
                'id': task_id
            }
        });
        await Items.destroy({
            where: {
                'id': task_id
            }
        });
        if (task.is_pokemon) {
            const pokemon = await PokemonData.findOne({
                where: {
                    'items_id': task_id
                }
            });
            await PokemonData.destroy({
                where: {
                    'items_id': task_id
                }
            })
            await PokemonImages.destroy({
                where: {
                    'pokemon_id': pokemon.pokemon_id
                }
            });
        }
    }

    async DeleteTasks() {
        const items_delete = Items.destroy({ truncate: true });
        const pokemon_data = PokemonData.destroy({ truncate: true });
        const pokemon_images = PokemonImages.destroy({ truncate: true });
        await Promise.all([items_delete, pokemon_data, pokemon_images]);
    }

    async CreatePokemon(pokemon) {
        const t = await sequelize.transaction()
        try {
            const item = await this.CreateTask({ name: pokemon.name, is_pokemon: true, status: false}, t);
            const pokemon_data = await this.CreatePokemonData({ item_id: item.id, pokemon_id: pokemon.id }, t);
            const pokemon_images = await this.CreatePokemonImages({ id: pokemon_data.id, images: pokemon.images }, t);
            await t.commit();
            return Promise.all([item, pokemon_data, pokemon_images]);
        } catch (error) {
            t.rollback();
            throw error;
        }
    }

    async UpdateTaskStatus(task_id) {
        await Items.update({
            'status': Sequelize.literal('NOT status'),
            'done': Sequelize.literal('CURRENT_TIMESTAMP')
        }, {
            where: {
                'id': task_id
            }
        });
    }

    async UpdateTaskText(task_id, task_text) {
        await Items.update({
            'ItemName': task_text
        }, {
            where: {
                'id': task_id
            },
            returning: true,
            plain: true
        });
    }
}

module.exports = new StorageService();