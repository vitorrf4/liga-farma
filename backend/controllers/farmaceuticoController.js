const service = require('../services/farmaceuticoService');

class FarmaceuticoController {
    async getFarmaceuticos(req, res) {
        try {
            const farmaceuticos = await service.getFarmaceuticos();

            res.status(200).json(farmaceuticos);
        } catch (error) {
            console.error('Erro na busca:', error);
            res.status(500).json({ error: 'Ocorreu um erro na aplicação.' });
        }
    }

    async getFarmaceuticoPorId(req, res) {
        try {
            const { id } = req.params;
            const farmaceutico = await service.getFarmaceuticoPorId(id);

            if (!farmaceutico) {
                return res.status(404).json({error: "Farmacêutico não encontrado"});
            }

            res.status(200).json(farmaceutico);
        } catch (error) {
            console.error('Erro na busca:', error);
            res.status(500).json({ error: 'Ocorreu um erro na aplicação.' });
        }
    }
 
    async cadastrarFarmaceutico(req, res) {
        try {
            const { nome, cpf, crf, telefone, especializacao, email, senha } = req.body;

            const novoFarmaceutico = await service.cadastrarFarmaceutico(
                nome, cpf, crf, telefone, especializacao, email, senha);

            res.status(201).json(novoFarmaceutico);
        } catch (error) {
            console.error('Erro na criação:', error);
            res.status(500).json({ error: 'Ocorreu um erro na aplicação.' });
        }
    }

    async atualizarFarmaceutico(req, res) {
        try {
            const farmaceutico = req.body;

            const farmaceuticoFoiAtualizado = await service.atualizarFarmaceutico( farmaceutico);

            if (!farmaceuticoFoiAtualizado) {
                return res.status(404).json({error: "Farmacêutico não encontrado"});
            }

            return res.status(204).send();
        } catch(error) {
            console.error('Erro na alteracao:', error);
            res.status(500).json({ error: 'Ocorreu um erro na aplicação.' });
        }
    }

    async deletarFarmaceutico(req, res) {
        try {
            const { id } = req.params;

            const farmaceuticosDeletados = await service.deletarFarmaceutico(id);
            if (farmaceuticosDeletados <= 0) {
                return res.status(404).json({error: "Farmacêutico não encontrado"});
            }

            res.status(204).send();
        } catch(error) {
            console.error('Erro na exclusão:', error);
            res.status(500).json({ error: 'Ocorreu um erro na aplicação.' });
        }
    }
}

module.exports = new FarmaceuticoController();