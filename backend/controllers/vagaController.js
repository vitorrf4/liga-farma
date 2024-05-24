const service = require('../services/vagaService');

class VagaController {
    async getVagas(req, res) {
        try {
            const vagas = await service.getVagas();

            res.status(200).json(vagas);
        } catch (error) {
            console.error('Erro na busca:', error);
            res.status(500).json({ error: 'Ocorreu um erro na aplicação.' });
        }
    }
    
    async getVagaPorEmpresaId(req, res) {
        try {
            const { id } = req.params;
            const vaga = await service.getVagaPorEmpresaId(id);

            if (!vaga) {
                return res.status(404).json({error: "Item não encontrado"});
            }

            res.status(200).json(vaga);
        } catch (error) {
            console.error('Erro na busca:', error);
            res.status(500).json({ error: 'Ocorreu um erro na aplicação.' });
        }
    }

    async getVagaPorId(req, res) {
        try {
            const { id } = req.params;
            const vaga = await service.getVagaPorId(id);

            if (!vaga) {
                return res.status(404).json({error: "Item não encontrado"});
            }

            res.status(200).json(vaga);
        } catch (error) {
            console.error('Erro na busca:', error);
            res.status(500).json({ error: 'Ocorreu um erro na aplicação.' });
        }
    }
    
    async criarVaga(req, res) {
        try {
            // TODO mudar destructuring para service
            const { titulo, descricao, salario, estado, 
                cidade, tipo, turno, farmaciaId } = req.body;

            const novaVaga = await service.cadastrarVaga(
                titulo, descricao, salario, estado, cidade, tipo, turno, farmaciaId);

            res.status(201).json(novaVaga);
        } catch (error) {
            console.error('Erro na criação:', error);
            res.status(500).json({ error: 'Ocorreu um erro na aplicação.' });
        }
    }

    async atualizarVaga(req, res) {
        try {
            const vaga = req.body;

            const vagaFoiAtualizada = await service.atualizarVaga(vaga);

            if (!vagaFoiAtualizada) {
                return res.status(404).json({error: "Item não encontrado"});
            }

            return res.status(204).send();
        } catch(error) {
            console.error('Erro na alteracao:', error);
            res.status(500).json({ error: 'Ocorreu um erro na aplicação.' });
        }
    }

    async atualizarStatusVaga(req, res) {
        try {
            const vaga = req.body;

            const vagaFoiAtualizada = await service.atualizarStatusVaga(vaga);

            if (!vagaFoiAtualizada) {
                return res.status(404).json({error: "Item não encontrado"});
            }

            return res.status(204).send();
        } catch(error) {
            console.error('Erro na alteracao:', error);
            res.status(500).json({ error: 'Ocorreu um erro na aplicação.' });
        }
    }
    
    async deletarVaga(req, res) {
        try {
            const { id } = req.params;

            const vagasDeletadas = await service.deletarVaga(id);
            if (vagasDeletadas <= 0) {
                return res.status(404).json({error: "Item não encontrado"});
            }

            res.status(204).send();
        } catch(error) {
            console.error('Erro na exclusão:', error);
            res.status(500).json({ error: 'Ocorreu um erro na aplicação.' });
        }
    }
}

module.exports = new VagaController();