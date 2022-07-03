module.exports = class PontoModel{
    constructor(ponto){
        this.saida = ponto.saida;
        if(ponto.data){
            this.data = ponto.data;
        }else{
            this.data = new Date();
        }
        this.materia_id = ponto.materia_id;
        this.updated_at = new Date();
    }
}