import { Service } from "@tsed/common";
import { NeDBPessoa } from "../nedb/NeDBPessoa";
import { Pessoa } from "../../interfaces/Pessoa";

@Service()
export class PessoaService {

    constructor(private neDBService: NeDBPessoa) {

    }

    validarCNPJ(cnpj) {
        var tamanho, numeros, digitos, soma, pos, resultado, i

        cnpj = cnpj.replace(/[^\d]+/g, '');

        if (cnpj == '') return false;

        if (cnpj.length != 14)
            return false;

        // Elimina CNPJs invalidos conhecidos
        if (cnpj == "00000000000000" ||
            cnpj == "11111111111111" ||
            cnpj == "22222222222222" ||
            cnpj == "33333333333333" ||
            cnpj == "44444444444444" ||
            cnpj == "55555555555555" ||
            cnpj == "66666666666666" ||
            cnpj == "77777777777777" ||
            cnpj == "88888888888888" ||
            cnpj == "99999999999999")
            return false;

        // Valida DVs
        tamanho = cnpj.length - 2
        numeros = cnpj.substring(0, tamanho);
        digitos = cnpj.substring(tamanho);
        soma = 0;
        pos = tamanho - 7;
        for (i = tamanho; i >= 1; i--) {
            soma += numeros.charAt(tamanho - i) * pos--;
            if (pos < 2)
                pos = 9;
        }
        resultado = soma % 11 < 2 ? 0 : 11 - soma % 11;
        if (resultado != digitos.charAt(0))
            return false;

        tamanho = tamanho + 1;
        numeros = cnpj.substring(0, tamanho);
        soma = 0;
        pos = tamanho - 7;
        for (i = tamanho; i >= 1; i--) {
            soma += numeros.charAt(tamanho - i) * pos--;
            if (pos < 2)
                pos = 9;
        }
        resultado = soma % 11 < 2 ? 0 : 11 - soma % 11;
        if (resultado != digitos.charAt(1))
            return false;

        return true;

    }

    validaCpf(strCPF) {
        var Soma;
        var Resto;
        Soma = 0;
        var i;
        if (strCPF == "00000000000") return false;

        for (i = 1; i <= 9; i++) Soma = Soma + parseInt(strCPF.substring(i - 1, i)) * (11 - i);
        Resto = (Soma * 10) % 11;

        if ((Resto == 10) || (Resto == 11)) Resto = 0;
        if (Resto != parseInt(strCPF.substring(9, 10))) return false;

        Soma = 0;
        for (i = 1; i <= 10; i++) Soma = Soma + parseInt(strCPF.substring(i - 1, i)) * (12 - i);
        Resto = (Soma * 10) % 11;

        if ((Resto == 10) || (Resto == 11)) Resto = 0;
        if (Resto != parseInt(strCPF.substring(10, 11))) return false;
        return true;
    }

    async cadastrar(pessoa: Pessoa) {
        var cnpjCpf = pessoa.documento.replace(/[^0-9]/g, '');
        var isValid;

        if(pessoa.tipo === 'PESSOA_FISICA'){
            isValid = this.validaCpf(cnpjCpf)
        }

        if(pessoa.tipo === 'PESSOA_JURIDICA'){
            isValid = this.validarCNPJ(cnpjCpf);
        }

        if (!isValid) {
            return `O CPF/CNPJ informado para a pessoa (${pessoa.nome}) é inválido.`
        }
        return await this.neDBService.create(pessoa);
    }

    async buscarTodos(): Promise<Pessoa[]>{
        return await this.neDBService.findAllDocuments();
    }

    async buscarPeloId(id: string): Promise<Pessoa>{
        return await this.neDBService.getById(id);
    }

    async atualizaPessoa(id: string, pessoa: Pessoa){
        return await this.neDBService.updatePessoa(id, pessoa);
    }

    async removePessoa(id){
        return await this.neDBService.deleteById(id);
    }
}