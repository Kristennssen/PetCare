const express = require('express');

const {
    getAllCategoriasProducto,
    getCategoriaProductoById,
    createCategoriaProducto,
    updateCategoriaProducto,
    deleteCategoriaProducto,
} = require('../controllers/categoriaProductoController');

const router = express.Router();

router.get('/', getAllCategoriasProducto);
router.get('/:id', getCategoriaProductoById);
router.post('/', createCategoriaProducto);
router.put('/:id', updateCategoriaProducto);
router.delete('/:id', deleteCategoriaProducto);

module.exports = router;