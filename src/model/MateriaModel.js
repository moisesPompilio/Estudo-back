module.exports = class MateriaModel{
    constructor(materia){
        this.titulo = materia.titulo;
        this.descricao = materia.descricao;
        this.usuario_id = materia.usuario_id;
        this.horasEstudo = materia.horasEstudo;
        this.updated_at = new Date();
        
    }
    adicionarCargoHoraria(horasEstudo) {
        this.horasEstudo += horasEstudo;
        this.updated_at = new Date();
    }
}