-- CreateTable
CREATE TABLE "flowDiagramms" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR(100) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "content" JSONB,

    CONSTRAINT "flowDiagramms_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "landingPages" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR(100) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "content" JSONB,

    CONSTRAINT "landingPages_pkey" PRIMARY KEY ("id")
);
