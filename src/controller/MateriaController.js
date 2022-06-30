const knex = require('../database/config/index');
const MateriaModel = require('../model/MateriaModel')
module.exports = {
    async index(req, res) {
        const { id } = await req.params;
        const { usuario_id, titulo } = await req.query;
        if (id) {
            const results = await knex("materia").where({ id });
            return res.json(results);
        } else if (usuario_id) {
            if (titulo) {
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
            const materia = await new MateriaModel(req.body);
            const verificarNome = await knex('materia').where({ usuario_id: materia.usuario_id, titulo: materia.titulo })
            if (verificarNome[0]) {
                res.status(205);
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
            if (horasEstudo) {
                const CargoHoraria = await req.body.horasEstudo
                const materiaRecebida = await knex("materia").where({ id: id });
                const materia = await new MateriaModel(materiaRecebida[0]);
                materia.adicionarCargoHoraria(CargoHoraria);
                await knex("materia").update(materia).where({ id: id });
                res.send("update sucess")
            } else {
                const materia = await new MateriaModel(req.body);
                const verificarNome = await knex('materia').where({ usuario_id: materia.usuario_id, titulo: materia.titulo });
                for (let verify of verificarNome) {
                    console.log(verify.id);
                    if (verify.id != id) {
                        res.status(205);
                    }
                }
                await knex("materia").update(materia).where({ id: id });
                res.send("update sucess")
            }

        } catch (error) {
            next(error)
        }
    },
    async delete(req, res, next) {
        try {
            const { id } = req.params;
            await knex("materia").where({ id: id }).del();
            res.send()

        } catch (error) {
            next(error)
        }
    },
}