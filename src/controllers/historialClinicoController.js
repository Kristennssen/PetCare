const prisma = require('../../prisma/prisma.js');

const getHistorialesClinicos = async (req, res) => {
    try {
        const historialesClinicos = await prisma.historialClinico.findMany();
        res.json(historialesClinicos);
    } catch (error) {
        console.error(error)
        res.status(500).json({ error: 'Error fetching clinical histories' });
    }
};

const getHistorialClinicoById = async (req, res) => {
    const { id } = req.params;
    try {
        const historialClinico = await prisma.historialClinico.findUnique({
            where: { id: parseInt(id) },
        });
        if (historialClinico) {
            res.json(historialClinico);
        } else {
            res.status(404).json({ error: 'Clinical history not found' });
        }
    } catch (error) {
        console.error(error)
        res.status(500).json({ error: 'Error fetching clinical history' });
    }
};

const createHistorialClinico = async (req, res) => {
    const { mascotaId, citaId, descripcionDiagnostico, descripcionTratamiento, productoId } = req.body;
    try {
        const newHistorialClinico = await prisma.historialClinico.create({
            data: {
                mascotaId,
                citaId,
                descripcionDiagnostico,
                descripcionTratamiento,
                productoId,
            },
        });
        res.status(201).json(newHistorialClinico);
    } catch (error) {
        console.error(error)
        res.status(500).json({ error: 'Error creating clinical history' });
    }
};

const updateHistorialClinico = async (req, res) => {
    const { id } = req.params;
    const { mascotaId, citaId, descripcionDiagnostico, descripcionTratamiento, productoId } = req.body;
    try {
        const updatedHistorialClinico = await prisma.historialClinico.update({
            where: { id: parseInt(id) },
            data: {
                mascotaId,
                citaId,
                descripcionDiagnostico,
                descripcionTratamiento,
                productoId,
            },
        });
        res.json(updatedHistorialClinico);
    } catch (error) {
        console.error(error)
        res.status(500).json({ error: 'Error updating clinical history' });
    }
};

const deleteHistorialClinico = async (req, res) => {
    const { id } = req.params;
    try {
        await prisma.historialClinico.delete({
            where: { id: parseInt(id) },
        });
        res.status(204).send();
    } catch (error) {
        console.error(error)
        res.status(500).json({ error: 'Error deleting clinical history' });
    }
};

module.exports = {
    getHistorialesClinicos,
    getHistorialClinicoById,
    createHistorialClinico,
    updateHistorialClinico,
    deleteHistorialClinico,
};