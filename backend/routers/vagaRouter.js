const express = require('express');
const router = express();
const controller = require('../controllers/vagaController');
const {verifyToken} = require("../config/jwt");

router.get('/', (req, res) => controller.getVagas(req, res));
router.get('/:id', (req, res) => controller.getVagaPorId(req, res));
router.get('/empresa/:id', (req, res) => controller.getVagaPorEmpresaId(req, res));
router.post('/', verifyToken, (req, res) => controller.criarVaga(req, res));
router.put('/', verifyToken, (req, res) => controller.atualizarVaga(req, res));
router.put('/status', verifyToken, (req, res) => controller.atualizarStatusVaga(req, res));
router.delete('/:id', verifyToken, (req, res) => controller.deletarVaga(req, res));

module.exports = router;