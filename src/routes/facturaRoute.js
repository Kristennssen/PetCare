const express = require('express');

const {
    getFacturas,
    getFacturaById,
    createFactura,
    updateFactura,
    deleteFactura,
} = require('../controllers/facturaController');

const router = express.Router();

router.get('/', getFacturas);
router.get('/:id', getFacturaById);
router.post('/', createFactura);
router.put('/:id', updateFactura);
router.delete('/:id', deleteFactura);

module.exports = router;