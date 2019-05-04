export class Exception{

    erro:boolean;
    mensagem:string;

    constructor(mensagem:string, erro:boolean){
        this.erro = erro;
        this.mensagem = mensagem;
    }

}