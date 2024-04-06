const express = require('express');
const router = express();
const controller = require('../controllers/farmaciaController.js');
const {verifyToken} = require("../jwt");

router.get('/farmacia', (req, res) => controller.getFarmacias(req, res));
router.get('/farmacia/:id', (req, res) => controller.getFarmaciaPorId(req, res));
router.post('/farmacia', verifyToken, (req, res) => controller.cadastrarFarmacia(req, res));
router.put('/farmacia', verifyToken, (req, res) => controller.atualizarFarmacia(req, res));
router.delete('/farmacia/:id', verifyToken, (req, res) => controller.deletarFarmacia(req, res));

module.exports = router;