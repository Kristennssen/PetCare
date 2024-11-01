const jwt = require('jsonwebtoken');
const prisma = require('../../prisma/prisma.js');

const authenticateToken = async (req, res, next) => {
  console.log('Middleware authenticateToken llamado'); 
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];
  if (!token) {
    console.log('Access token is missing or invalid');
    return res.status(401).json({ error: 'Access token is missing or invalid' });
  }
  console.log('Token recibido:', token);
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    console.log('Decoded token:', decoded); 
    const session = await prisma.sesion.findUnique({
      where: { token },
      
    });
    if (!session) {
      console.log('Session not found or invalid');
      return res.status(401).json({ error: 'Session not found or invalid' });
    }

    req.user = decoded;
    next();
  } catch (error) {
    console.error('Failed to authenticate token:', error);
    res.status(403).json({ error: 'Failed to authenticate token' });
  }
};

module.exports = authenticateToken;