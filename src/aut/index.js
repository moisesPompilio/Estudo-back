const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken')
const secret = process.env.SECRET;
const emisao = process.env.EMISAO;
const authServe = process.env.AUTHSERVE;
const refreshSecret = process.env.REFRESH_SECRET;
module.exports = {
    async cripSenha(senha) {
        const salt = await bcrypt.genSalt(12);
        return await bcrypt.hash(senha, salt);
    },
    async checkSenha(senha, senhaUsuario) {
        return await bcrypt.compare(senha, senhaUsuario)
    },
    async token(id) {
        const refreshToken = jwt.sign({ id, emisao, authServe }, refreshSecret, { expiresIn: '3600s' });
        const token =  jwt.sign({ id }, secret, { expiresIn: '1800s' });
        return { token, refreshToken };
    },
    async checkToken(req, res, next) {
        console.log(req.headers);
        const authHeader = req.headers['authorization'];
        const token = authHeader && authHeader.split(' ')[1];
        if (!token) {
            return res.status(401).send({ msg: "acesso negado" });
        }
        try {
            jwt.verify(token, secret);
            next()
        } catch (error) {
            res.status(400).json({ msg: "token invalido" });
        }
    },
    async refrehToken(req, res, next) {
        const { refreshToken } = await req.body;
        if (refreshToken == null) {
            return res.sendStatus(401);
        }
        try {
            jwt.verify(refreshToken, refreshSecret, async (err, user) => {
                if (err) {
                    return res.sendStatus(403);
                }
                req.user = user;
                if (emisao == user.emisao && authServe == user.authServe) {
                    const aut = require('../aut/index');
                    token = await aut.token(user.id);
                    res.send( token)
                } else {
                    return res.status(400).json({ msg: "token invalido" });
                }
            })
        } catch (error) {
            return res.sendStatus(403)
        }
    },
    async identification(req){
        const authHeader = req.headers['authorization'];
        const token = authHeader && authHeader.split(' ')[1];
        const tokenID = await jwt.verify(token, secret);
        return tokenID;
    }

}