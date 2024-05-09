const express = require('express');
const router = express();
const controller = require('../controllers/farmaceuticoController')
const {verifyToken} = require("../config/jwt");

router.get('/', (req, res) => controller.getFarmaceuticos(req, res));
router.get('/:id', (req, res) => controller.getFarmaceuticoPorId(req, res));
router.post('/', verifyToken, (req, res) => controller.cadastrarFarmaceutico(req, res));
router.put('/', verifyToken, (req, res) => controller.atualizarFarmaceutico(req, res));
router.delete('/:id', verifyToken, (req, res) => controller.deletarFarmaceutico(req, res));

module.exports = router;