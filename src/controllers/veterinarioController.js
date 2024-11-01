const prisma = require('../../prisma/prisma.js');

const getVeterinarios = async (req, res) => {
    try {
        const veterinarios = await prisma.veterinario.findMany();
        res.status(200).json(veterinarios);
    } catch (error) {
        console.error(error)
        res.status(500).json({ error: 'Error fetching veterinarios' });
    }
};

const getVeterinarioById = async (req, res) => {
    const { id } = req.params;
    try {
        const veterinario = await prisma.veterinario.findUnique({
            where: { id: parseInt(id) },
        });
        if (veterinario) {
            res.status(200).json(veterinario);
        } else {
            res.status(404).json({ error: 'Veterinario not found' });
        }
    } catch (error) {
        console.error(error)
        res.status(500).json({ error: 'Error fetching veterinario' });
    }
};

const createVeterinario = async (req, res) => {
    const { nombreVeterinario, especialidadVeterinario } = req.body;
    try {
        const newVeterinario = await prisma.veterinario.create({
            data: {
                nombreVeterinario,
                especialidadVeterinario,
            },
        });
        res.status(201).json(newVeterinario);
    } catch (error) {
        console.error(error)
        res.status(500).json({ error: 'Error creating veterinario' });
    }
};

const updateVeterinario = async (req, res) => {
    const { id } = req.params;
    const { nombreVeterinario, especialidadVeterinario } = req.body;
    try {
        const updatedVeterinario = await prisma.veterinario.update({
            where: { id: parseInt(id) },
            data: {
                nombreVeterinario,
                especialidadVeterinario,
            },
        });
        res.status(200).json(updatedVeterinario);
    } catch (error) {
        console.error(error)
        res.status(500).json({ error: 'Error updating veterinario' });
    }
};

const deleteVeterinario = async (req, res) => {
    const { id } = req.params;
    try {
        await prisma.veterinario.delete({
            where: { id: parseInt(id) },
        });
        res.status(204).send();
    } catch (error) {
        console.error(error)
        res.status(500).json({ error: 'Error deleting veterinario' });
    }
};

module.exports = {
    getVeterinarios,
    getVeterinarioById,
    createVeterinario,
    updateVeterinario,
    deleteVeterinario,
};