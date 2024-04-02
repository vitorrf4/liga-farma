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
            // TODO mudar extracao para service
            const { titulo, descricao, salario, estado, 
                cidade, quantidadeVagas, tipo, turno, farmaciaId } = req.body;

            const novaFarmacia = await service.cadastrarVaga(
                titulo, descricao, salario, estado, cidade, quantidadeVagas, tipo, turno, farmaciaId);

            res.status(201).json(novaFarmacia);
        } catch (error) {
            console.error('Erro na criação:', error);
            res.status(500).json({ error: 'Ocorreu um erro na aplicação.' });
        }
    }

    async atualizarVaga(req, res) {
        try {
            const farmacia = req.body;

            const vagaFoiAtualizada = await service.atualizarVaga(farmacia);

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