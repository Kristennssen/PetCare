const express = require('express');

const {
    getHistorialesClinicos,
    getHistorialClinicoById,
    createHistorialClinico,
    updateHistorialClinico,
    deleteHistorialClinico
} = require('../controllers/historialClinicoController');

const router = express.Router();

router.get('/', getHistorialesClinicos);
router.get('/:id', getHistorialClinicoById);
router.post('/', createHistorialClinico);
router.put('/:id', updateHistorialClinico);
router.delete('/:id', deleteHistorialClinico);

module.exports = router;