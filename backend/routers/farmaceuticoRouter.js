const express = require('express');
const router = express();
const controller = require('../controllers/farmaceuticoController')

router.get('/farmaceutico', (req, res) => controller.getFarmaceuticos(req, res));
router.get('/farmaceutico/:id', (req, res) => controller.getFarmaceuticoPorId(req, res));
router.post('/farmaceutico', (req, res) => controller.cadastrarFarmaceutico(req, res));
router.put('/farmaceutico', (req, res) => controller.atualizarFarmaceutico(req, res));
router.delete('/farmaceutico/:id', (req, res) => controller.deletarFarmaceutico(req, res));

module.exports = router;