module.exports = class ObservacoesModel{
    constructor(observacoes){
        this.titulo = observacoes.titulo;
        this.descricao = observacoes.descricao;
        this.materia_id = observacoes.materia_id;
        this.updated_at = new Date();
    }
}