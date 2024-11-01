-- CreateTable
CREATE TABLE "CategoriaProducto" (
    "id" SERIAL NOT NULL,
    "nombreCategoria" TEXT NOT NULL,

    CONSTRAINT "CategoriaProducto_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Cita" (
    "id" SERIAL NOT NULL,
    "mascotaId" INTEGER NOT NULL,
    "veterinarioId" INTEGER NOT NULL,
    "fechaCita" TIMESTAMP(3) NOT NULL,
    "horaCita" TIMESTAMP(3) NOT NULL,
    "motivoCita" TEXT NOT NULL,

    CONSTRAINT "Cita_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Dueno" (
    "id" SERIAL NOT NULL,
    "nombreDueno" TEXT NOT NULL,
    "apellidoDueno" TEXT NOT NULL,
    "direccionDueno" TEXT NOT NULL,
    "telefonoDueno" INTEGER NOT NULL,
    "correoDueno" TEXT NOT NULL,

    CONSTRAINT "Dueno_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Empleado" (
    "id" SERIAL NOT NULL,
    "nombreEmpleado" TEXT NOT NULL,
    "apellidoEmpleado" TEXT NOT NULL,
    "telefonoEmpleado" INTEGER NOT NULL,
    "correoEmpleado" TEXT NOT NULL,
    "rolId" INTEGER NOT NULL,

    CONSTRAINT "Empleado_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Factura" (
    "id" SERIAL NOT NULL,
    "citaId" INTEGER NOT NULL,
    "productoId" INTEGER NOT NULL,
    "montoTotal" DOUBLE PRECISION NOT NULL,
    "metodoPagoId" INTEGER NOT NULL,
    "descripcion" TEXT NOT NULL,
    "fechaPago" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Factura_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "HistorialClinico" (
    "id" SERIAL NOT NULL,
    "mascotaId" INTEGER NOT NULL,
    "citaId" INTEGER NOT NULL,
    "descripcionDiagnostico" TEXT NOT NULL,
    "descripcionTratamiento" TEXT NOT NULL,
    "productoId" INTEGER NOT NULL,

    CONSTRAINT "HistorialClinico_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Inventario" (
    "id" SERIAL NOT NULL,
    "nombreProducto" TEXT NOT NULL,
    "cantidadProducto" INTEGER NOT NULL,
    "precioUnitario" DOUBLE PRECISION NOT NULL,
    "categoriaId" INTEGER NOT NULL,
    "fechaVencimiento" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Inventario_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Mascota" (
    "id" SERIAL NOT NULL,
    "nombreMascota" TEXT NOT NULL,
    "especieMascota" TEXT NOT NULL,
    "razaMascota" TEXT NOT NULL,
    "edadMascota" INTEGER NOT NULL,
    "fechaNacimiento" TIMESTAMP(3) NOT NULL,
    "duenoId" INTEGER NOT NULL,

    CONSTRAINT "Mascota_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "MetodoPago" (
    "id" SERIAL NOT NULL,
    "tipo" TEXT NOT NULL,
    "detallePago" TEXT,

    CONSTRAINT "MetodoPago_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Rol" (
    "id" SERIAL NOT NULL,
    "nombreRol" TEXT NOT NULL,

    CONSTRAINT "Rol_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Veterinario" (
    "id" SERIAL NOT NULL,
    "nombreVeterinario" TEXT NOT NULL,
    "especialidadVeterinario" TEXT NOT NULL,

    CONSTRAINT "Veterinario_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Cita" ADD CONSTRAINT "Cita_mascotaId_fkey" FOREIGN KEY ("mascotaId") REFERENCES "Mascota"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Cita" ADD CONSTRAINT "Cita_veterinarioId_fkey" FOREIGN KEY ("veterinarioId") REFERENCES "Veterinario"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Empleado" ADD CONSTRAINT "Empleado_rolId_fkey" FOREIGN KEY ("rolId") REFERENCES "Rol"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Factura" ADD CONSTRAINT "Factura_citaId_fkey" FOREIGN KEY ("citaId") REFERENCES "Cita"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Factura" ADD CONSTRAINT "Factura_productoId_fkey" FOREIGN KEY ("productoId") REFERENCES "Inventario"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Factura" ADD CONSTRAINT "Factura_metodoPagoId_fkey" FOREIGN KEY ("metodoPagoId") REFERENCES "MetodoPago"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "HistorialClinico" ADD CONSTRAINT "HistorialClinico_mascotaId_fkey" FOREIGN KEY ("mascotaId") REFERENCES "Mascota"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "HistorialClinico" ADD CONSTRAINT "HistorialClinico_citaId_fkey" FOREIGN KEY ("citaId") REFERENCES "Cita"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "HistorialClinico" ADD CONSTRAINT "HistorialClinico_productoId_fkey" FOREIGN KEY ("productoId") REFERENCES "Inventario"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Inventario" ADD CONSTRAINT "Inventario_categoriaId_fkey" FOREIGN KEY ("categoriaId") REFERENCES "CategoriaProducto"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Mascota" ADD CONSTRAINT "Mascota_duenoId_fkey" FOREIGN KEY ("duenoId") REFERENCES "Dueno"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
