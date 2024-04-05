const express = require('express');
const router = express();
const controller = require('../controllers/candidaturaController')

router.get('/candidatura', (req, res) => controller.getCandidaturas(req, res));
router.get('/candidatura/:id', (req, res) => controller.getCandidaturaPorId(req, res));
router.get('/candidatura/pessoa/:id', (req, res) => controller.getCandidaturaPorPessoaId(req, res));
router.post('/candidatura', (req, res) => controller.cadastrarCandidatura(req, res));
router.put('/candidatura', (req, res) => controller.atualizarCandidatura(req, res));
router.delete('/candidatura', (req, res) => controller.deletarCandidatura(req, res));

module.exports = router;