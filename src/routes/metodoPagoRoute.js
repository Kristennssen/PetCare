const express = require('express');

const {
    getAllMetodoPago,
    getMetodoPagoById,
    createMetodoPago,
    updateMetodoPago,
    deleteMetodoPago
} = require('../controllers/metodoPagoController');

const router = express.Router();

router.get('/', getAllMetodoPago);
router.get('/:id', getMetodoPagoById);
router.post('/', createMetodoPago);
router.put('/:id', updateMetodoPago);
router.delete('/:id', deleteMetodoPago);

module.exports = router;