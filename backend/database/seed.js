class Seeds {
    async seedTodos() {
        await this.seedFarmaceutico();
        await this.seedFarmaceutico();
        await this.seedFarmacia();
        await this.seedVaga();
        await this.seedVaga();
        await this.seedVaga();
        await this.seedVaga();
        await this.seedCandidatura();
        await this.seedContrato();
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
                descricao: 'empresa farmaceutico descricao placeholder',
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
    
    async seedContrato() {
        const body = {
            farmaciaId: 1,
            candidaturaId: 1,
            vagaId: 3,
            dataInicio: "2024-04-18",
            dataFim: "2024-04-17",
            status: ""
        }
        await this.executarPost(body, 'contrato');
    }
    
    async seedCandidatura() {
        const body = {
            vagaId: 3,
            farmaceuticoId: 1,
            mensagem: 'teste mensagem'
        }
        await this.executarPost(body, 'candidatura');
    }
    
    async executarPost(body, url) {
        const json = JSON.stringify(body);
        await fetch(`http://localhost:3000/${url}`, {
            method: 'POST',
            body: json,
            headers: {
                'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNzEyNDEyODk2fQ.iPmdF_DvyT-2AUTUZjWPngmKVQFbzWIEVnhqPbGnGUo',
                'Content-Type': 'application/json'
            }
        });
    }
}

module.exports = new Seeds();