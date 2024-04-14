const express = require('express');
const router = express();
const controller = require('../controllers/farmaceuticoController')
const {verifyToken} = require("../config/jwt");

router.get('/farmaceutico', (req, res) => controller.getFarmaceuticos(req, res));
router.get('/farmaceutico/:id', (req, res) => controller.getFarmaceuticoPorId(req, res));
router.post('/farmaceutico', verifyToken, (req, res) => controller.cadastrarFarmaceutico(req, res));
router.put('/farmaceutico', verifyToken, (req, res) => controller.atualizarFarmaceutico(req, res));
router.delete('/farmaceutico/:id', verifyToken, (req, res) => controller.deletarFarmaceutico(req, res));

module.exports = router;