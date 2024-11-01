const express = require('express');

const {
    getCitas,
    getCitaById,
    createCita,
    updateCita,
    deleteCita,
} = require('../controllers/citaController');

const router = express.Router();

router.get('/', getCitas);
router.get('/:id', getCitaById);
router.post('/', createCita);
router.put('/:id', updateCita);
router.delete('/:id', deleteCita);

module.exports = router;