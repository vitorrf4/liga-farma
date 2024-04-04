class Seeds {
    async seedTodos() {
        await this.seedFarmaceutico();
        await this.seedFarmaceutico();
        await this.seedFarmacia();
        await this.seedVaga();
        await this.seedVaga();
        await this.seedVaga();
        await this.seedCandidatura();
    }
    
    async seedFarmaceutico() {
        const body = {
            tipo: 'PESSOA',
            informacoes: {
                nome: "João Silva",
                    cpf: "111111111-11",
                    crf: "1234-5",
                    telefone: "98412-2983",
                    email: 'p',
                    senha: 'p',
                    especializacao: null
            }
        }
        await this.executarPost(body, 'auth/cadastro');
    }

    async seedFarmacia() {
        const body = {
            tipo: 'EMPRESA',
            informacoes: {
                nome: "nome2",
                cnpj: "cpf",
                endereco: "endereco",
                email: 'e',
                senha: 'e',
                telefone: null
            }
        }
        await this.executarPost(body, 'auth/cadastro');
    }

    async seedVaga() {
        const body = {
            titulo: "titulo 1",
            descricao: "Descricao placeholder Descricao placeholder Descricao placeholder Descricao placeholder Descricao placeholder Descricao placeholder ",
            salario: 2000.5,
            estado: "PR",
            cidade: "Paranagua",
            quantidadeVagas: 1,
            farmaciaId: 1,
            tipo: "PJ",
            turno: "Noturno"
        }
        await this.executarPost(body, 'vaga');
    }
    
    async seedCandidatura() {
        const body = {
            vagaId: 2,
            farmaceuticoId: 2,
            mensage : 'teste mensagem'
        }
        await this.executarPost(body, 'candidatura');
    }
    
    async executarPost(body, url) {
        const json = JSON.stringify(body);
        await fetch(`http://localhost:3000/${url}`, {
            method: 'POST',
            body: json,
            headers: {
                'Content-Type': 'application/json'
            }
        });
    }
}

module.exports = new Seeds();