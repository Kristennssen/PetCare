const prisma = require('../../prisma/prisma.js');

const getCitas = async (req, res) => {
  try {
    const citas = await prisma.cita.findMany({
      include: {
        mascota: true,
        veterinario: true,
        facturas: true,
        historialesClinicos: true,
      },
    });
    res.json(citas);
  } catch (error) {
    console.error(error)
    res.status(500).json({ error: 'Error fetching citas' });
  }
};

const getCitaById = async (req, res) => {
  const { id } = req.params;
  try {
    const cita = await prisma.cita.findUnique({
      where: { id: parseInt(id) },
      include: {
        mascota: true,
        veterinario: true,
        facturas: true,
        historialesClinicos: true,
      },
    });
    if (cita) {
      res.json(cita);
    } else {
      res.status(404).json({ error: 'Cita not found' });
    }
  } catch (error) {
    console.error(error)
    res.status(500).json({ error: 'Error fetching cita' });
  }
};

const createCita = async (req, res) => {
  const { mascotaId, veterinarioId, fechaCita, horaCita, motivoCita } = req.body;
  try {
    const newCita = await prisma.cita.create({
      data: {
        mascotaId,
        veterinarioId,
        fechaCita: new Date(fechaCita),
        horaCita: new Date(horaCita),
        motivoCita,
      },
    });
    res.status(201).json(newCita);
  } catch (error) {
    console.error(error)
    res.status(500).json({ error: 'Error creating cita' });
  }
};

const updateCita = async (req, res) => {
  const { id } = req.params;
  const { mascotaId, veterinarioId, fechaCita, horaCita, motivoCita } = req.body;
  try {
    const updatedCita = await prisma.cita.update({
      where: { id: parseInt(id) },
      data: {
        mascotaId,
        veterinarioId,
        fechaCita: new Date(fechaCita),
        horaCita: new Date(horaCita),
        motivoCita,
      },
    });
    res.json(updatedCita);
  } catch (error) {
    console.error(error)
    res.status(500).json({ error: 'Error updating cita' });
  }
};

const deleteCita = async (req, res) => {
  const { id } = req.params;
  try {
    await prisma.cita.delete({
      where: { id: parseInt(id) },
    });
    res.status(204).send();
  } catch (error) {
    console.error(error)
    res.status(500).json({ error: 'Error deleting cita' });
  }
};

module.exports = {
  getCitas,
  getCitaById,
  createCita,
  updateCita,
  deleteCita,
};