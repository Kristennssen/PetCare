const express = require('express');

const {
    getInventarios,
    getInventarioById,
    createInventario,
    updateInventario,
    deleteInventario
} = require('../controllers/inventarioController');

const router = express.Router();

router.get('/', getInventarios);
router.get('/:id', getInventarioById);
router.post('/', createInventario);
router.put('/:id', updateInventario);
router.delete('/:id', deleteInventario);

module.exports = router;