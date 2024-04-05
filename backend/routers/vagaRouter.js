const express = require('express');
const router = express();
const controller = require('../controllers/vagaController');

router.get('/vaga', (req, res) => controller.getVagas(req, res));
router.get('/vaga/:id', (req, res) => controller.getVagaPorId(req, res));
router.get('/vaga/empresa/:id', (req, res) => controller.getVagaPorEmpresaId(req, res));
router.get('/vaga/pessoa/:id', (req, res) => controller.getVagaPorPessoaId(req, res));
router.post('/vaga', (req, res) => controller.criarVaga(req, res));
router.put('/vaga', (req, res) => controller.atualizarVaga(req, res));
router.delete('/vaga/:id', (req, res) => controller.deletarVaga(req, res));

module.exports = router;