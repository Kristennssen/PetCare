const express = require('express');

const {
    getDuenos,
    getDuenoById,
    createDueno,
    updateDueno,
    deleteDueno,
} = require('../controllers/duenoController');

const router = express.Router();

router.get('/', getDuenos);
router.get('/:id', getDuenoById);
router.post('/', createDueno);
router.put('/:id', updateDueno);
router.delete('/:id', deleteDueno);

module.exports = router;