const prisma = require('../../prisma/prisma.js');

const getInventarios = async (req, res) => {
    try {
        const inventarios = await prisma.inventario.findMany({
            include: {
                categoria: true,
                facturas: true,
                historialesClinicos: true,
            },
        });
        res.status(200).json(inventarios);
    } catch (error) {
        console.error(error)
        res.status(500).json({ error: 'Error fetching inventarios' });
    }
};

const getInventarioById = async (req, res) => {
    const { id } = req.params;
    try {
        const inventario = await prisma.inventario.findUnique({
            where: { id: parseInt(id) },
            include: {
                categoria: true,
                facturas: true,
                historialesClinicos: true,
            },
        });
        if (inventario) {
            res.status(200).json(inventario);
        } else {
            res.status(404).json({ error: 'Inventario not found' });
        }
    } catch (error) {
        console.error(error)
        res.status(500).json({ error: 'Error fetching inventario' });
    }
};

const createInventario = async (req, res) => {
    const { nombreProducto, cantidadProducto, precioUnitario, categoriaId, fechaVencimiento } = req.body;
    try {
        const newInventario = await prisma.inventario.create({
            data: {
                nombreProducto,
                cantidadProducto,
                precioUnitario,
                categoriaId,
                fechaVencimiento: new Date(fechaVencimiento),
            },
        });
        res.status(201).json(newInventario);
    } catch (error) {
        console.error(error)
        res.status(500).json({ error: 'Error creating inventario' });
    }
};

const updateInventario = async (req, res) => {
    const { id } = req.params;
    const { nombreProducto, cantidadProducto, precioUnitario, categoriaId, fechaVencimiento } = req.body;
    try {
        const updatedInventario = await prisma.inventario.update({
            where: { id: parseInt(id) },
            data: {
                nombreProducto,
                cantidadProducto,
                precioUnitario,
                categoriaId,
                fechaVencimiento: new Date(fechaVencimiento),
            },
        });
        res.status(200).json(updatedInventario);
    } catch (error) {
        console.error(error)
        res.status(500).json({ error: 'Error updating inventario' });
    }
};

const deleteInventario = async (req, res) => {
    const { id } = req.params;
    try {
        await prisma.inventario.delete({
            where: { id: parseInt(id) },
        });
        res.status(204).send();
    } catch (error) {
        console.error(error)
        res.status(500).json({ error: 'Error deleting inventario' });
    }
};

module.exports = {
    getInventarios,
    getInventarioById,
    createInventario,
    updateInventario,
    deleteInventario,
};