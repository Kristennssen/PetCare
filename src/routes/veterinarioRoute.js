const express = require('express');

const router = express.Router();
const {
    getVeterinarios,
    getVeterinarioById,
    createVeterinario,
    updateVeterinario,
    deleteVeterinario,
} = require('../controllers/veterinarioController');

router.get('/', getVeterinarios);
router.get('/:id', getVeterinarioById);
router.post('/', createVeterinario);
router.put('/:id', updateVeterinario);
router.delete('/:id', deleteVeterinario);

module.exports = router;