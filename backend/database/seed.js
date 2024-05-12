const {logger} = require("sequelize/lib/utils/logger");

class Seeds {
    async seedTodos() {
        const pessoa = await this.seedFarmaceutico().then(r => r.informacoes);
        const empresa = await this.seedFarmacia().then(r => r.informacoes);
        const vaga = await this.seedVaga(empresa.id);
        await this.seedVaga(empresa.id);
        await this.seedVaga2(empresa.id);
        await this.seedVaga2(empresa.id);
        const candidatura = await this.seedCandidatura(vaga.id, pessoa.id);
        await this.seedContrato(empresa.id, candidatura.id, vaga.id);

        console.log("Seed inicial finalizada");
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
        return await this.executarPost(body, 'auth/cadastro');
    }

    async seedFarmacia() {
        const body = {
            tipo: 'EMPRESA',
            informacoes: {
                nome: "Farmacia Unipreco",
                cnpj: "120397812-21",
                endereco: "Avenida Presidente Silva 274",
                descricao: 'Farmácia local em busca de profissionais dedicados para se juntarem à nossa equipe. Oferecemos um ambiente de trabalho dinâmico e colaborativo, onde você terá a oportunidade de ajudar a comunidade fornecendo serviços farmacêuticos de qualidade. Procuramos indivíduos motivados, com habilidades de comunicação excelentes e um forte compromisso com a saúde pública. Se você é apaixonado por ajudar os outros e está em busca de uma carreira gratificante na área de saúde, gostaríamos de conhecê-lo!',
                email: 'e',
                senha: 'e',
                telefone: null
            }
        }
        return await this.executarPost(body, 'auth/cadastro');
    }

    async seedVaga(farmaciaId) {
        const body = {
            titulo: "Coordenador Farmacêutico",
            descricao: "Descricao placeholder Descricao placeholder Descricao placeholder Descricao placeholder Descricao placeholder Descricao placeholder ",
            salario: 2000.5,
            estado: "PR",
            cidade: "Paranagua",
            quantidadeVagas: 2,
            farmaciaId: farmaciaId,
            tipo: "CLT",
            turno: "Noturno"
        }
        return await this.executarPost(body, 'vaga');
    }

    async seedVaga2(farmaciaId) {
        const body = {
            titulo: "Farmacêutico de Balcão",
            descricao: "Descricao placeholder Descricao placeholder Descricao placeholder Descricao placeholder Descricao placeholder Descricao placeholder ",
            salario: 4050.20,
            estado: "SP",
            cidade: "São Paulo",
            quantidadeVagas: 5,
            farmaciaId: farmaciaId,
            tipo: "Temporário",
            turno: "12:00 as 17:00"
        }
        return await this.executarPost(body, 'vaga');
    }
    
    async seedContrato(farmaciaId, candidaturaId, vagaId) {
        const body = {
            farmaciaId: farmaciaId,
            candidaturaId: candidaturaId,
            vagaId: vagaId,
            dataInicio: "2024-04-18",
            dataFim: "2024-05-19",
            status: ""
        }
        return await this.executarPost(body, 'contrato');
    }
    
    async seedCandidatura(vagaId, farmaceuticoId) {
        const body = {
            vagaId: vagaId,
            farmaceuticoId: farmaceuticoId,
            mensagem: 'Estou entusiasmado para me candidatar à vaga anunciada em sua empresa. Minha experiência e habilidades estão alinhadas com os requisitos do cargo, e estou ansioso para contribuir com meu melhor para o sucesso da equipe. Agradeço a oportunidade e aguardo com expectativa a possibilidade de discutir como posso agregar valor à sua organização.'
        }
        return await this.executarPost(body, 'candidatura');
    }
    
    async executarPost(body, url) {
        const json = JSON.stringify(body);
        const port = process.env.PORT;

        const res = await fetch(`http://localhost:${port}/${url}`, {
            method: 'POST',
            body: json,
            headers: {
                'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNzEyNDEyODk2fQ.iPmdF_DvyT-2AUTUZjWPngmKVQFbzWIEVnhqPbGnGUo',
                'Content-Type': 'application/json'
            }
        });
        
        return res.json();
    }
}

module.exports = new Seeds();