export class ReturnDTO{
    mensagem:string;
    sucesso:boolean;
    object;

    constructor(mensagem, sucesso, object){
        this.mensagem = mensagem;
        this.sucesso = sucesso;
        this.object = object;
    }
}