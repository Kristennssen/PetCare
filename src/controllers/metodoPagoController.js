const prisma = require('../../prisma/prisma.js');

const getAllMetodoPago = async (req, res) => {
    try {
        const metodoPagos = await prisma.metodoPago.findMany();
        res.status(200).json(metodoPagos);
    } catch (error) {
        console.error(error)
        res.status(500).json({ error: 'Error fetching MetodoPago' });
    }
};

const getMetodoPagoById = async (req, res) => {
    const { id } = req.params;
    try {
        const metodoPago = await prisma.metodoPago.findUnique({
            where: { id: parseInt(id) },
        });
        if (metodoPago) {
            res.status(200).json(metodoPago);
        } else {
            res.status(404).json({ error: 'MetodoPago not found' });
        }
    } catch (error) {
        console.error(error)
        res.status(500).json({ error: 'Error fetching MetodoPago' });
    }
};

const createMetodoPago = async (req, res) => {
    const { tipo, detallePago } = req.body;
    try {
        const newMetodoPago = await prisma.metodoPago.create({
            data: { tipo, detallePago },
        });
        res.status(201).json(newMetodoPago);
    } catch (error) {
        console.error(error)
        res.status(500).json({ error: 'Error creating MetodoPago' });
    }
};

const updateMetodoPago = async (req, res) => {
    const { id } = req.params;
    const { tipo, detallePago } = req.body;
    try {
        const updatedMetodoPago = await prisma.metodoPago.update({
            where: { id: parseInt(id) },
            data: { tipo, detallePago },
        });
        res.status(200).json(updatedMetodoPago);
    } catch (error) {
        console.error(error)
        res.status(500).json({ error: 'Error updating MetodoPago' });
    }
};

const deleteMetodoPago = async (req, res) => {
    const { id } = req.params;
    try {
        await prisma.metodoPago.delete({
            where: { id: parseInt(id) },
        });
        res.status(204).send();
    } catch (error) {
        console.error(error)
        res.status(500).json({ error: 'Error deleting MetodoPago' });
    }
};

module.exports = {
    getAllMetodoPago,
    getMetodoPagoById,
    createMetodoPago,
    updateMetodoPago,
    deleteMetodoPago,
};