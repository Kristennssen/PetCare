const prisma = require('../../prisma/prisma.js');

const getEmpleados = async (req, res) => {
    try {
        const empleados = await prisma.empleado.findMany({
            include: {
                rol: true,
                usuario: true,
            },
        });
        res.status(200).json(empleados);
    } catch (error) {
        res.status(500).json({ error: 'Error fetching empleados' });
    }
};

const getEmpleadoById = async (req, res) => {
    const { id } = req.params;
    try {
        const empleado = await prisma.empleado.findUnique({
            where: { id: parseInt(id) },
            include: {
                rol: true,
                usuario: true,
            },
        });
        if (empleado) {
            res.status(200).json(empleado);
        } else {
            res.status(404).json({ error: 'Empleado not found' });
        }
    } catch (error) {
        res.status(500).json({ error: 'Error fetching empleado' });
    }
};

const createEmpleado = async (req, res) => {
    const { nombreEmpleado, apellidoEmpleado, telefonoEmpleado, correoEmpleado, rolId, usuario } = req.body;
    try {
        const newEmpleado = await prisma.empleado.create({
            data: {
                nombreEmpleado,
                apellidoEmpleado,
                telefonoEmpleado,
                correoEmpleado,
                rolId,
                usuario: {
                    create: usuario,
                },
            },
        });
        res.status(201).json(newEmpleado);
    } catch (error) {
        res.status(500).json({ error: 'Error creating empleado' });
    }
};

const updateEmpleado = async (req, res) => {
    const { id } = req.params;
    const { nombreEmpleado, apellidoEmpleado, telefonoEmpleado, correoEmpleado, rolId, usuario } = req.body;
    try {
        const updatedEmpleado = await prisma.empleado.update({
            where: { id: parseInt(id) },
            data: {
                nombreEmpleado,
                apellidoEmpleado,
                telefonoEmpleado,
                correoEmpleado,
                rolId,
                usuario: {
                    update: usuario,
                },
            },
        });
        res.status(200).json(updatedEmpleado);
    } catch (error) {
        res.status(500).json({ error: 'Error updating empleado' });
    }
};

const deleteEmpleado = async (req, res) => {
    const { id } = req.params;
    try {
        await prisma.empleado.delete({
            where: { id: parseInt(id) },
        });
        res.status(204).send();
    } catch (error) {
        res.status(500).json({ error: 'Error deleting empleado' });
    }
};

module.exports = {
    getEmpleados,
    getEmpleadoById,
    createEmpleado,
    updateEmpleado,
    deleteEmpleado,
};