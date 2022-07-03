module.exports = class ControllePontoModel{
    constructor(contollePonto){
        this.saida_id = contollePonto.saida_id;
        this.entrada_id = contollePonto.entrada_id;
        this.materia_id = contollePonto.materia_id;
        this.horaEstudo = (contollePonto.saida.getTime() - contollePonto.entrada.getTime()) / 1000;
        this.updated_at = new Date();
        
    }
    calcularHoraEstudo(saida, entrada) {
        this.horaEstudo = (saida.getTime() - entrada.getTime()) / 1000;
        this.updated_at = new Date(); 
    }
}