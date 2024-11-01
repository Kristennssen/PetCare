const prisma = require('../../prisma/prisma.js');

const getMascotas = async (req, res) => {
    try {
        const mascotas = await prisma.mascota.findMany();
        res.status(200).json(mascotas);
    } catch (error) {
        console.error(error)
        res.status(500).json({ error: 'Error fetching mascotas' });
    }
};

const getMascotaById = async (req, res) => {
    const { id } = req.params;
    try {
        const mascota = await prisma.mascota.findUnique({
            where: { id: parseInt(id) },
        });
        if (mascota) {
            res.status(200).json(mascota);
        } else {
            res.status(404).json({ error: 'Mascota not found' });
        }
    } catch (error) {
        console.error(error)
        res.status(500).json({ error: 'Error fetching mascota' });
    }
};

const createMascota = async (req, res) => {
    const { nombreMascota, especieMascota, razaMascota, edadMascota, fechaNacimiento, duenoId } = req.body;
    try {
        const newMascota = await prisma.mascota.create({
            data: {
                nombreMascota,
                especieMascota,
                razaMascota,
                edadMascota,
                fechaNacimiento: new Date(fechaNacimiento),
                duenoId,
            },
        });
        res.status(201).json(newMascota);
    } catch (error) {
        console.error(error)
        res.status(500).json({ error: 'Error creating mascota' });
    }
};

const updateMascota = async (req, res) => {
    const { id } = req.params;
    const { nombreMascota, especieMascota, razaMascota, edadMascota, fechaNacimiento, duenoId } = req.body;
    try {
        const updatedMascota = await prisma.mascota.update({
            where: { id: parseInt(id) },
            data: {
                nombreMascota,
                especieMascota,
                razaMascota,
                edadMascota,
                fechaNacimiento: new Date(fechaNacimiento),
                duenoId,
            },
        });
        res.status(200).json(updatedMascota);
    } catch (error) {
        console.error(error)
        res.status(500).json({ error: 'Error updating mascota' });
    }
};

const deleteMascota = async (req, res) => {
    const { id } = req.params;
    try {
        await prisma.mascota.delete({
            where: { id: parseInt(id) },
        });
        res.status(204).send();
    } catch (error) {
        console.error(error)
        res.status(500).json({ error: 'Error deleting mascota' });
    }
};

module.exports = {
    getMascotas,
    getMascotaById,
    createMascota,
    updateMascota,
    deleteMascota,
};