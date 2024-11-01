const express = require('express');
require('dotenv').config();
const prisma = require('../prisma/prisma.js');
const categoriaProductoRoutes = require('./routes/categoriaProductoRoute');
const citaRoutes = require('./routes/citaRoute');
const duenoRoutes = require('./routes/duenoRoute');
const empleadoRoutes = require('./routes/empleadoRoute');
const facturaRoutes = require('./routes/facturaRoute');
const historiaClinicaRoutes = require('./routes/historialClinicoRoute');
const inventarioRoutes = require('./routes/inventarioRoute');
const mascotaRoutes = require('./routes/mascotaRoute');
const metodopagoRoutes = require('./routes/metodopagoRoute');
const rolRoutes = require('./routes/rolRoute');
const veterinarioRoutes = require('./routes/veterinarioRoute');
const authRoutes = require('./routes/authRoutes');
const authenticateToken = require('./middleware/authenticateToken');

const app = express();
const PORT = process.env.PORT;


app.use(express.json());

app.use('/api/auth', authRoutes);

app.use(authenticateToken); // Protege  las rutas que estan debajo de esta linea

app.use('/api/categorias', categoriaProductoRoutes);
app.use('/api/citas', citaRoutes);
app.use('/api/duenos', duenoRoutes);
app.use('/api/empleados', empleadoRoutes);
app.use('/api/facturas', facturaRoutes);
app.use('/api/historias', historiaClinicaRoutes); 
app.use('/api/inventarios', inventarioRoutes);
app.use('/api/mascotas', mascotaRoutes);  
app.use('/api/metodos', metodopagoRoutes);
app.use('/api/roles', rolRoutes); 
app.use('/api/veterinarios', veterinarioRoutes);

app.get('/', (req, res) => {
  res.send('Bienvenido a PetCare');
});

app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});