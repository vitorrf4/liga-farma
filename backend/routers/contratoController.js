const express = require('express');
const router = express();
const controller = require('../controllers/contratoController');
const {verifyToken} = require("../config/jwt");

router.use(verifyToken);

router.get('/contrato', (req, res) => controller.getContratos(req, res));
router.get('/contrato/:id', (req, res) => controller.getContratosPorId(req, res));
router.post('/contrato', (req, res) => controller.cadastrarContrato(req, res));
router.put('/contrato', (req, res) => controller.atualizarContrato(req, res));

module.exports = router;