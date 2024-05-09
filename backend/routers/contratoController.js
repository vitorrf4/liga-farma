const express = require('express');
const router = express();
const controller = require('../controllers/contratoController');
const {verifyToken} = require("../config/jwt");

router.use(verifyToken);

router.get('/', (req, res) => controller.getContratos(req, res));
router.get('/:id', (req, res) => controller.getContratosPorId(req, res));
router.post('/', (req, res) => controller.cadastrarContrato(req, res));
router.put('/:id', (req, res) => controller.atualizarContrato(req, res));

module.exports = router;