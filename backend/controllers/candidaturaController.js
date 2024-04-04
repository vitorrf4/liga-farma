const service = require('../services/candidaturaService');

class CandidaturaController {
    async getCandidaturas(req, res) {
        try {
            const candidaturas = await service.getCandidaturas();

            res.status(200).json(candidaturas);
        } catch (error) {
            console.error('Erro na busca:', error);
            res.status(500).json({ error: 'Ocorreu um erro na aplicação.' });
        }
    }

    async getCandidaturaPorId(req, res) {
        try {
            const { id } = req.params;
            const candidatura = await service.getCandidaturaPorId(id);

            if (!candidatura) {
                return res.status(404).json({error: "Item não encontrado"});
            }

            res.status(200).json(candidatura);
        } catch (error) {
            console.error('Erro na busca:', error);
            res.status(500).json({ error: 'Ocorreu um erro na aplicação.' });
        }
    }

    async cadastrarCandidatura(req, res) {
        try {
            const { vagaId, farmaceuticoId, mensagem } = req.body;

            const novaCandidatura = await service.cadastrarCandidatura(vagaId, farmaceuticoId, mensagem);

            res.status(201).json(novaCandidatura);
        } catch (error) {
            console.error('Erro na criação:', error);
            res.status(500).json({ error: 'Ocorreu um erro na aplicação.' });
        }
    }

    async atualizarCandidatura(req, res) {
        try {
            const candidatura = req.body;

            const contratoFoiAtualizado = await service.atualizarCandidatura(candidatura);

            if (!contratoFoiAtualizado) {
                return res.status(404).json({error: "Item não encontrado"});
            }

            return res.status(204).send();
        } catch(error) {
            console.error('Erro na alteracao:', error);
            res.status(500).json({ error: 'Ocorreu um erro na aplicação.' });
        }
    }
    
    async deletarCandidatura(req, res) {
        try {
            const { id } = req.params;

            const candidaturasDeletadas = await service.deletarCandidatura(id);
            if (candidaturasDeletadas <= 0) {
                return res.status(404).json({error: "Item não encontrado"});
            }

            res.status(204).send();
        } catch(error) {
            console.error('Erro na exclusão:', error);
            res.status(500).json({ error: 'Ocorreu um erro na aplicação.' });
        }
    }
}

module.exports = new CandidaturaController();