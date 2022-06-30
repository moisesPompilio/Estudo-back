module.exports = class MateriaModel{
    constructor(materia){
        this.titulo = materia.titulo;
        this.descricao = materia.descricao;
        this.usuario_id = materia.usuario_id;
        this.horasEstudo = materia.horasEstudo;
    }
    adicionarCargoHoraria(horasEstudo) {
        this.horasEstudo += horasEstudo;
    }
}