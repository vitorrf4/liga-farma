const express = require('express');
const router = express();
const controller = require('../controllers/farmaciaController.js');
const {verifyToken} = require("../config/jwt");

router.get('/', (req, res) => controller.getFarmacias(req, res));
router.get('/:id', (req, res) => controller.getFarmaciaPorId(req, res));
router.post('/', verifyToken, (req, res) => controller.cadastrarFarmacia(req, res));
router.put('/', verifyToken, (req, res) => controller.atualizarFarmacia(req, res));
router.delete('/:id', verifyToken, (req, res) => controller.deletarFarmacia(req, res));

module.exports = router;