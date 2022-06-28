module.exports = class UsuarioModel{
    constructor(usuario){
        this.name = usuario.name;
        this.email = usuario.email;
        this.senha = usuario.senha;
    }
}