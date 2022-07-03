const knex = require('../database/config/index');
const ControllePontoModel = require('../model/ControllePontoModel');
const MateriaModel = require('../model/MateriaModel');
const PontoModel = require('../model/PontoModel');
module.exports = {
    async index(req, res) {
        const { id } = await req.params;
        const { materia_id, page = 1 } = await req.query;
        if (id) {
            const results = await knex("ponto").where({ id });
            return res.json(results);
        } else if (materia_id) {
            const results = await knex("ponto").where({ materia_id });
            return res.json(results);
        }
        const results = await knex("ponto");
        return res.json(results)
    },
    async create(req, res, next) {
        try {
            const { materia_id } = req.params;
            const pontos = await knex("ponto").where({ materia_id });
            var ponto = {};
            if (!pontos[0]) {
                ponto = new PontoModel({ materia_id, saida: false })
            }
            else if (pontos.at(-1).saida == true) {
                ponto = new PontoModel({ materia_id, saida: false })
            } else {
                ponto = new PontoModel({ materia_id, saida: true })
                const result = await knex('ponto').insert(ponto);
                const saida_id = await result[0];
                const saida = ponto.data;
                const entrada_id = pontos.at(-1).id;
                const entrada = pontos.at(-1).data;
                const controllePonto = new ControllePontoModel({ saida_id, entrada_id, entrada, saida, materia_id });
                const resultContollePonto = await knex('controlle_ponto').insert(controllePonto);
                var materia = await knex("materia").where({ id: materia_id });
                materia = new MateriaModel(materia[0]);
                const horaEstudo = controllePonto.horaEstudo;
                if (horaEstudo != 0) {
                    materia.adicionarCargoHoraria(horaEstudo);
                }
                const updateMateria = await knex("materia").where({ id: materia_id }).update(materia);
                return res.json({ resultContollePonto, saida_id, updateMateria });
            }
            const result = await knex('ponto').insert(ponto);
            return res.json(result);
        } catch (error) {
            next(error)
        }
    },
    async update(req, res, next) {
        try {
            const { id } = await req.params;
            let { data } = await req.body;
            data = new Date(data);
            const pontoBanco = await knex('ponto').where({ id });
            const { saida, materia_id } = pontoBanco[0];
            const ponto = new PontoModel({ saida, data, materia_id });
            const update = await knex("ponto").update(ponto).where({ id: id });
            let controllePontoVerify = false
            var controllePontoBanco = {};
            if (saida == 1) {
                controllePontoBanco = await knex('controlle_ponto').where({ saida_id: id })[0];
                controllePontoVerify = !controllePontoBanco[0] ? false : true;
            } else {
                controllePontoBanco = await knex('controlle_ponto').where({ entrada_id: id });
                controllePontoVerify = !controllePontoBanco[0] ? false : true;
            }
            if (controllePontoVerify) {
                controllePontoBanco = controllePontoBanco[0];
                const pontoEntrada = await knex("ponto").where({ id: controllePontoBanco.entrada_id });
                const pontoSaida = await knex("ponto").where({ id: controllePontoBanco.saida_id });
                const entrada = pontoEntrada[0].data;
                const saida = pontoSaida[0].data;
                const controllePonto = new ControllePontoModel({ entrada, saida, saida_id: controllePontoBanco.saida_id, entrada_id: controllePontoBanco.entrada_id, materia_id: controllePontoBanco.materia_id });
                const updateContolle = await knex("controlle_ponto").update(controllePonto).where({ id: controllePontoBanco.id });
                var materia = await knex("materia").where({ id: controllePontoBanco.materia_id });
                materia = new MateriaModel(materia[0]);
                const horaEstudo = controllePonto.horaEstudo - controllePontoBanco.horaEstudo;
                if (horaEstudo != 0) {
                    materia.adicionarCargoHoraria(horaEstudo);
                }
                const updateMateria = await knex("materia").where({ id: controllePontoBanco.materia_id }).update(materia);
                res.send({ message: "update sucess", update, updateContolle, updateMateria });
            } else {
                res.send("update sucess" + update);
            }
        } catch (error) {
            next(error)
        }
    },
    async delete(req, res, next) {
        try {
            const { id } = req.params;
            await knex("ponto").where({ id: id }).del();
            res.send()

        } catch (error) {
            next(error)
        }
    },
}