const service = require('../services/contratoService');

class ContratoController {
    async getContratos(req, res) {
        try {
            const contratos = await service.getContratos();

            res.status(200).json(contratos);
        } catch (error) {
            console.error('Erro na busca:', error);
            res.status(500).json({ error: 'Ocorreu um erro na aplicação.' });
        }
    }

    async getContratosPorId(req, res) {
        try {
            const { id } = req.params;
            const contrato = await service.getContratoPorId(id);

            if (!contrato) {
                return res.status(404).json({error: "Item não encontrado"});
            }

            res.status(200).json(contrato);
        } catch (error) {
            console.error('Erro na busca:', error);
            res.status(500).json({ error: 'Ocorreu um erro na aplicação.' });
        }
    }

    async cadastrarContrato(req, res) {
        try {
            const { farmaceuticoId, farmaciaId, vagaId, dataInicio, dataFim } = req.body;

            const novoContrato = await service.cadastrarContrato(
                farmaciaId, farmaceuticoId, vagaId, dataInicio, dataFim);
            
            if (!novoContrato) {
                return res.status(400).json({error: 'Vaga já preenchida'});
            }

            res.status(201).json(novoContrato);
        } catch (error) {
            console.error('Erro na criação:', error);
            res.status(500).json({ error: 'Ocorreu um erro na aplicação.' });
        }
    }

    async atualizarContrato(req, res) {
        try {
            const contrato = req.body;

            const contratoFoiAtualizado = await service.atualizarContrato(contrato);

            if (!contratoFoiAtualizado) {
                return res.status(404).json({error: "Item não encontrado"});
            }

            return res.status(204).send();
        } catch(error) {
            console.error('Erro na alteracao:', error);
            res.status(500).json({ error: 'Ocorreu um erro na aplicação.' });
        }
    }
}

module.exports = new ContratoController();