const express = require('express');
const router = express();
const controller = require('../controllers/farmaciaController.js')

router.get('/farmacia', (req, res) => controller.getFarmacias(req, res));
router.get('/farmacia/:id', (req, res) => controller.getFarmaciaPorId(req, res));
router.post('/farmacia', (req, res) => controller.cadastrarFarmacia(req, res));
router.put('/farmacia', (req, res) => controller.atualizarFarmacia(req, res));
router.delete('/farmacia/:id', (req, res) => controller.deletarFarmacia(req, res));

module.exports = router;