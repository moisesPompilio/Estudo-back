const knex = require('../database/config/index');
const MateriaModel = require('../model/MateriaModel')
const jwt = require('jsonwebtoken')
const secret = process.env.SECRET;
const aut = require('../aut/index');
module.exports = {
    async index(req, res) {
        const { id } = await req.params;
        const { titulo, page = 1 } = await req.query;
        const tokenID = await aut.identification(req);
        const usuario_id = tokenID.id;
        if (id) {
            const results = await knex("materia").where({ id, usuario_id });
            return res.json(results);
        } else if (usuario_id) {
            console.log(titulo);
            if (titulo && titulo != "") {
                const results = await knex("materia").where({ usuario_id, titulo });
                return res.json(results)
            } else {
                const results = await knex("materia").where({ usuario_id });
                return res.json(results);
            }
        }
        const results = await knex("materia");
        return res.json(results)
    },
    async create(req, res, next) {
        try {
            const tokenID = await aut.identification(req);
            const usuario_id = tokenID.id;
            const materia = await new MateriaModel(req.body);
            materia.usuario_id = usuario_id;
            const verificarNome = await knex('materia').where({ usuario_id: materia.usuario_id, titulo: materia.titulo })
            if (verificarNome[0]) {
                res.sendStatus(205);
            } else {
                const insert = await knex('materia').insert(materia);
                res.status(201).send(insert)
            }
        } catch (error) {
            next(error)
        }
    },
    async update(req, res, next) {
        try {
            const { horasEstudo } = await req.query;
            const { id } = req.params;
            const tokenID = await aut.identification(req);
            const usuario_id = tokenID.id;
            if (horasEstudo) {
                const CargoHoraria = await req.body.horasEstudo
                const materiaRecebida = await knex("materia").where({ id: id });
                const materia = await new MateriaModel(materiaRecebida[0]);
                materia.adicionarCargoHoraria(CargoHoraria);
                await knex("materia").update(materia).where({ id: id });
                res.send("update sucess")
            } else {
                const materia = await new MateriaModel(req.body);
                materia.usuario_id = usuario_id;
                const verificarNome = await knex('materia').where({ usuario_id, titulo: materia.titulo });
                if (verificarNome[0]) {
                    for (let verify of verificarNome) {
                        if (verify.id != id) {
                            res.status(205).send(verificarNome);
                        }
                    }
                    await knex("materia").update(materia).where({ id: id, usuario_id });
                    res.send("update sucess")
                } else {
                    await knex("materia").update(materia).where({ id: id, usuario_id });
                    res.send("update sucess")
                }
            }

        } catch (error) {
            next(error)
        }
    },
    async delete(req, res, next) {
        try {
            const tokenID = await aut.identification(req);
            const usuario_id = tokenID.id;
            const { id } = req.params;
            await knex("materia").where({ id: id, usuario_id }).del();
            res.send()

        } catch (error) {
            next(error)
        }
    },
}