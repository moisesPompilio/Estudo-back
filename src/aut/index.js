const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken')
const secret = process.env.SECRET;
module.exports = {
    async cripSenha(senha) {
        const salt = await bcrypt.genSalt(12);
        return await bcrypt.hash(senha, salt);
    },
    async checkSenha(senha, senhaUsuario) {
        return await bcrypt.compare(senha, senhaUsuario)
    },
    async token(id) {
        const token = jwt.sign({id: id},secret);
        return token;
    },
    async checkToken(req, res, next){
        const authHeader = req.headers['authorization'];
        const token = authHeader && authHeader.split(' ')[1];
        if (!token){
            return res.status(401).send({msg: "acesso negado"});
        }
        try {
            jwt.verify(token, secret);
            next()
        } catch (error) {
            res.status(400).json({msg: "token invalido"});
        }
    }


}