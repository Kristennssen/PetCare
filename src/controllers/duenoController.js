const prisma = require('../../prisma/prisma.js');

const getDuenos = async (req, res) => {
  try {
    const duenos = await prisma.dueno.findMany({
      include: {
        mascotas: true,
      },
    });
    res.status(200).json(duenos);
  } catch (error) {
    console.error(error)
    res.status(500).json({ error: 'Error fetching owners' });
  }
};

const getDuenoById = async (req, res) => {
  const { id } = req.params;
  try {
    const dueno = await prisma.dueno.findUnique({
      where: { id: parseInt(id) },
      include: {
        mascotas: true,
      },
    });
    if (!dueno) {
      return res.status(404).json({ error: 'Owner not found' });
    }
    res.status(200).json(dueno);
  } catch (error) {
    console.error(error)
    res.status(500).json({ error: 'Error fetching owner' });
  }
};

const createDueno = async (req, res) => {
  const { nombreDueno, apellidoDueno, direccionDueno, telefonoDueno, correoDueno } = req.body;
  try {
    const newDueno = await prisma.dueno.create({
      data: {
        nombreDueno,
        apellidoDueno,
        direccionDueno,
        telefonoDueno,
        correoDueno,
      },
    });
    res.status(201).json(newDueno);
  } catch (error) {
    console.error(error)
    res.status(500).json({ error: 'Error creating owner' });
  }
};

const updateDueno = async (req, res) => {
  const { id } = req.params;
  const { nombreDueno, apellidoDueno, direccionDueno, telefonoDueno, correoDueno } = req.body;
  try {
    const updatedDueno = await prisma.dueno.update({
      where: { id: parseInt(id) },
      data: {
        nombreDueno,
        apellidoDueno,
        direccionDueno,
        telefonoDueno,
        correoDueno,
      },
    });
    res.status(200).json(updatedDueno);
  } catch (error) {
    console.error(error)
    res.status(500).json({ error: 'Error updating owner' });
  }
};

const deleteDueno = async (req, res) => {
  const { id } = req.params;
  try {
    await prisma.dueno.delete({
      where: { id: parseInt(id) },
    });
    res.status(204).send();
  } catch (error) {
    console.error(error)
    res.status(500).json({ error: 'Error deleting owner' });
  }
};

module.exports = {
  getDuenos,
  getDuenoById,
  createDueno,
  updateDueno,
  deleteDueno,
};