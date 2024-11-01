const express = require('express');

const {
    getMascotas,
    getMascotaById,
    createMascota,
    updateMascota,
    deleteMascota
} = require('../controllers/mascotaController');

const router = express.Router();

router.get('/', getMascotas);
router.get('/:id', getMascotaById);
router.post('/', createMascota);
router.put('/:id', updateMascota);
router.delete('/:id', deleteMascota);

module.exports = router;