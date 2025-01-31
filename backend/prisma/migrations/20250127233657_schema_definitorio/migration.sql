-- CreateTable
CREATE TABLE "Criminal" (
    "id" SERIAL NOT NULL,
    "nombre" TEXT NOT NULL,
    "apodo" TEXT NOT NULL,
    "edad" INTEGER NOT NULL,
    "genero" TEXT NOT NULL,
    "tratamiento" TEXT NOT NULL,
    "peligrosidad" TEXT NOT NULL,
    "personal_asignado" INTEGER,
    "celda" INTEGER,
    "foto" TEXT,

    CONSTRAINT "Criminal_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Personal" (
    "dni" INTEGER NOT NULL,
    "nombre" TEXT NOT NULL,
    "rol" TEXT NOT NULL,
    "turno" TEXT NOT NULL,
    "contacto" INTEGER NOT NULL,

    CONSTRAINT "Personal_pkey" PRIMARY KEY ("dni")
);

-- CreateTable
CREATE TABLE "Delito" (
    "numero_delito" SERIAL NOT NULL,
    "criminal_id" INTEGER NOT NULL,
    "descripcion" TEXT NOT NULL,
    "fecha" TEXT NOT NULL,
    "sentencia_judicial" TEXT NOT NULL,
    "lugarDelito" TEXT NOT NULL,
    "estadoDelito" TEXT NOT NULL,
    "nivelPrioridad" TEXT NOT NULL,

    CONSTRAINT "Delito_pkey" PRIMARY KEY ("numero_delito")
);

-- CreateTable
CREATE TABLE "Celda" (
    "numero_celda" SERIAL NOT NULL,
    "tipoCelda" TEXT NOT NULL,
    "descripcionCelda" TEXT NOT NULL,
    "nivelSeguridad" TEXT NOT NULL,
    "camarasSeguridad" BOOLEAN NOT NULL,
    "sensoresMovimiento" BOOLEAN NOT NULL,
    "alarmas" BOOLEAN NOT NULL,
    "piso" INTEGER NOT NULL,
    "capacidad" INTEGER NOT NULL,

    CONSTRAINT "Celda_pkey" PRIMARY KEY ("numero_celda")
);

-- AddForeignKey
ALTER TABLE "Criminal" ADD CONSTRAINT "Criminal_personal_asignado_fkey" FOREIGN KEY ("personal_asignado") REFERENCES "Personal"("dni") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Criminal" ADD CONSTRAINT "Criminal_celda_fkey" FOREIGN KEY ("celda") REFERENCES "Celda"("numero_celda") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Delito" ADD CONSTRAINT "Delito_criminal_id_fkey" FOREIGN KEY ("criminal_id") REFERENCES "Criminal"("id") ON DELETE CASCADE ON UPDATE CASCADE;
