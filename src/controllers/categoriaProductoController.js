const prisma = require('../../prisma/prisma.js');

const getAllCategoriasProducto = async (req, res) => {
  try {
    const categorias = await prisma.categoriaProducto.findMany();
    res.status(200).json(categorias);
  } catch (error) {
    console.error(error)
    res.status(500).json({ error: 'Error fetching categories' });
  }
};

const getCategoriaProductoById = async (req, res) => {
  const { id } = req.params;
  try {
    const categoria = await prisma.categoriaProducto.findUnique({
      where: { id: parseInt(id) },
    });
    if (categoria) {
      res.status(200).json(categoria);
    } else {
      res.status(404).json({ error: 'Category not found' });
    }
  } catch (error) {
    console.error(error)
    res.status(500).json({ error: 'Error fetching category' });
  }
};

const createCategoriaProducto = async (req, res) => {
  const { nombreCategoria } = req.body;
  try {
    const newCategoria = await prisma.categoriaProducto.create({
      data: { nombreCategoria },
    });
    res.status(201).json(newCategoria);
  } catch (error) {
    console.error(error)
    res.status(500).json({ error: 'Error creating category' });
  }
};
const updateCategoriaProducto = async (req, res) => {
  const { id } = req.params;
  const { nombreCategoria } = req.body;
  try {
    const updatedCategoria = await prisma.categoriaProducto.update({
      where: { id: parseInt(id) },
      data: { nombreCategoria },
    });
    res.status(200).json(updatedCategoria);
  } catch (error) {
    res.status(500).json({ error: 'Error updating category' });
  }
};

const deleteCategoriaProducto = async (req, res) => {
  const { id } = req.params;
  try {
    await prisma.categoriaProducto.delete({
      where: { id: parseInt(id) },
    });
    res.status(204).send();
  } catch (error) {
    console.error(error)
    res.status(500).json({ error: 'Error deleting category' });
  }
};

module.exports = {
  getAllCategoriasProducto,
  getCategoriaProductoById,
  createCategoriaProducto,
  updateCategoriaProducto,
  deleteCategoriaProducto,
};