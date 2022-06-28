const knex = require('../database/config/index');
const UsuarioModel = require('../model/UsuarioModel');
module.exports = {
    async index(req, res) {
        const results = await knex("usuario");
        return res.json(results)
    },
    async create(req, res, next) {
        try {
            const usuario = await new UsuarioModel(req.body);
            const insert = await knex('usuario').insert(usuario);
            res.status(201).send(insert)
        } catch (error) {
            next(error)
        }
    },
    async update(req, res, next) {
        try {
            const usuario = await new UsuarioModel(req.body);
            const {id} = req.params;
            await knex("usuario").update(usuario).where({id:id});
            res.send()
            
        } catch (error) {
            next(error)
        }
    },
    async delete(req, res, next) {
        try {
            const {id} = req.params;
            await knex("usuario").where({id:id}).del();
            res.send()
            
        } catch (error) {
            next(error)
        }
    },

}