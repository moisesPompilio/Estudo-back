const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken')
const knex = require('../database/config/index');
const UsuarioModel = require('../model/UsuarioModel');
const aut = require('../aut/index');
module.exports = {
    async index(req, res) {
        const results = await knex("usuario");
        return res.json(results)
    },
    async create(req, res, next) {
        try {
            const {name, email, senha, confirmacaoSenha} = await req.body
            if (!name || !email || !senha || !confirmacaoSenha){
                return res.status(422).json({msg: "dados prenchidos icorretamente"})
            }else if(senha != confirmacaoSenha){
                return res.status(422).json({msg: "senhas diferentes"})
            }
            const verifyName = await knex("usuario").where({name: name});
            const verifyEmail = await knex("usuario").where({email: email});
            if(verifyEmail[0]){
                return res.status(422).json({msg: "Email ja cadastrado"})
            }else if(verifyName[0]){
                return res.status(422).json({msg: "Nome ja cadastrado"})
            }
            const salt = await bcrypt.genSalt(12);
            const passwordHash = await aut.cripSenha(senha);

            const usuario = await new UsuarioModel({name, email, senha: passwordHash});
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
    async login(req, res, next){
        try {
            const usuario = await new UsuarioModel(req.body);
            const usuarioBanco = await knex("usuario").where({email: usuario.email});
            if(!usuarioBanco[0]){
                return res.status(422).json({msg: "Usuario ainda nao cadastrado"})
            }
            const checkSenha = await aut.checkSenha(usuario.senha, usuarioBanco[0].senha);
            if(!checkSenha){
                return res.status(422).json({msg: "Senha incorreta"});
            }
            const secret = process.env.SECRET;
            const token = await aut.token(usuarioBanco[0].id);
            res.send({msg: 'usuario logado com sucesso', token})
            
        } catch (error) {
            next(error)
        }
    }

}