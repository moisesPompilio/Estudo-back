const knex = require('../database/config/index');
const ObservacoesModel = require('../model/ObservacoesModel')
module.exports = {
    async index(req, res) {
        const { id } = await req.params;
        const { materia_id, page = 1 } = await req.query;
        if (id) {
            const results = await knex("observacoes").where({ id });
            return res.json(results);
        } else if (materia_id) {
            const results = await knex("observacoes").where({ materia_id });
            return res.json(results);
        }
        const results = await knex("observacoes");
        return res.json(results)
    },
    async create(req, res, next) {
        try {
            const observacoes = await new ObservacoesModel(req.body);
            const verficarTitulo = await knex('observacoes').where({ materia_id: observacoes.materia_id, titulo: observacoes.titulo })
            if (verficarTitulo[0]) {
                res.status(205).send(205);
            } else {
                const insert = await knex('observacoes').insert(observacoes);
                res.status(201).send(insert)
            }
        } catch (error) {
            next(error)
        }
    },
    async update(req, res, next) {
        try {
            const verifyDuplicate = false;
            const { id } = req.params;
            const observacoes = await new ObservacoesModel(req.body);
            const verficarTitulo = await knex('observacoes').where({ materia_id: observacoes.materia_id, titulo: observacoes.titulo });
            for (let verify of verficarTitulo) {
                console.log(verify.id);
                if (verify.id != id) {
                    return res.status(205).send("not update");
                    verifyDuplicate = true;
                }
            }
            if (!verifyDuplicate) {
                await knex("observacoes").update(observacoes).where({ id: id });
                res.send("update sucess")
            }
        } catch (error) {
            next(error)
        }
    },
    async delete(req, res, next) {
        try {
            const { id } = req.params;
            await knex("observacoes").where({ id: id }).del();
            res.send()

        } catch (error) {
            next(error)
        }
    },
}