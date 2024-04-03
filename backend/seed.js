class Seeds {
    async seedTodos() {
        await this.seedFarmaceutico();
        await this.seedFarmacia();
        await this.seedVaga();
        await this.seedVaga();
        await this.seedVaga();
    }
    
    async seedFarmaceutico() {
        const body = {
            tipo: 'PESSOA',
            informacoes: {
                nome: "João Silva",
                    cpf: "111111111-11",
                    crf: "1234-5",
                    telefone: "98412-2983",
                    email: 'a',
                    senha: 'a',
                    especializacao: null
            }
        }
        await this.executarPost(body, 'auth/cadastro');
    }

    async seedFarmacia() {
        const body = {
            nome: "nome2",
            cnpj: "cpf",
            endereco: "endereco",
            email: null,
            telefone: null
        }
        await this.executarPost(body, 'farmacia');
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