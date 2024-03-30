const express = require('express');
const router = express();
const controller = require('../controllers/farmaciaController.js')

router.get('/farmacia', (req, res) => controller.getFarmaceuticos(req, res));
router.get('/farmacia/:id', (req, res) => controller.getFarmaceuticoPorId(req, res));
router.post('/farmacia', (req, res) => controller.cadastraFarmaceutico(req, res));
router.put('/farmacia', (req, res) => controller.atualizarFarmaceutico(req, res));
router.delete('/farmacia/:id', (req, res) => controller.deletarFarmaceutico(req, res));

module.exports = router;