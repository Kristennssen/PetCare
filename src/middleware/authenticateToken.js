const jwt = require('jsonwebtoken');
const prisma = require('../../prisma/prisma.js');

const authenticateToken = async (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];
  if (!token) return res.sendStatus(401);

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const session = await prisma.sesion.findUnique({
      where: { token },
    });
    if (!session) return res.sendStatus(401);

    req.user = decoded;
    next();
  } catch (error) {
    res.sendStatus(403);
  }
};

module.exports = authenticateToken;