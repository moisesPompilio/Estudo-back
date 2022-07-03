module.exports = class UsuarioModel{
    constructor(usuario){
        this.name = usuario.name;
        this.email = usuario.email;
        this.senha = usuario.senha;
        this.updated_at = new Date();
    }
}