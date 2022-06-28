const knex = require('../database/config/index')

module.exports = {
    async index(req, res){
        const results = await knex("usuario");

        return res.json(results)
    }
}