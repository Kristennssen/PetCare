const prisma = require('../../prisma/prisma.js');

const getFacturas = async (req, res) => {
    try {
        const facturas = await prisma.factura.findMany();
        res.status(200).json(facturas);
    } catch (error) {
        console.error(error)
        res.status(500).json({ error: 'Error fetching facturas' });
    }
};

const getFacturaById = async (req, res) => {
    const { id } = req.params;
    try {
        const factura = await prisma.factura.findUnique({
            where: { id: parseInt(id) },
        });
        if (factura) {
            res.status(200).json(factura);
        } else {
            res.status(404).json({ error: 'Factura not found' });
        }
    } catch (error) {
        console.error(error)
        res.status(500).json({ error: 'Error fetching factura' });
    }
};

const createFactura = async (req, res) => {
    const { citaId, productoId, montoTotal, metodoPagoId, descripcion, fechaPago } = req.body;
    try {
        const newFactura = await prisma.factura.create({
            data: {
                citaId,
                productoId,
                montoTotal,
                metodoPagoId,
                descripcion,
                fechaPago: new Date(fechaPago),
            },
        });
        res.status(201).json(newFactura);
    } catch (error) {
        console.error(error)
        res.status(500).json({ error: 'Error creating factura' });
    }
};

const updateFactura = async (req, res) => {
    const { id } = req.params;
    const { citaId, productoId, montoTotal, metodoPagoId, descripcion, fechaPago } = req.body;
    try {
        const updatedFactura = await prisma.factura.update({
            where: { id: parseInt(id) },
            data: {
                citaId,
                productoId,
                montoTotal,
                metodoPagoId,
                descripcion,
                fechaPago: new Date(fechaPago),
            },
        });
        res.status(200).json(updatedFactura);
    } catch (error) {
        console.error(error)
        res.status(500).json({ error: 'Error updating factura' });
    }
};

const deleteFactura = async (req, res) => {
    const { id } = req.params;
    try {
        await prisma.factura.delete({
            where: { id: parseInt(id) },
        });
        res.status(204).send();
    } catch (error) {
        console.error(error)
        res.status(500).json({ error: 'Error deleting factura' });
    }
};

module.exports = {
    getFacturas,
    getFacturaById,
    createFactura,
    updateFactura,
    deleteFactura,
};