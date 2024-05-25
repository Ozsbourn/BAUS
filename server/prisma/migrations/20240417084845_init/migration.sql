-- CreateTable
CREATE TABLE "organisations" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "ownerId" INTEGER NOT NULL,

    CONSTRAINT "organisations_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "collab_orgs" (
    "id" SERIAL NOT NULL,
    "name" TEXT,

    CONSTRAINT "collab_orgs_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "users" (
    "id" SERIAL NOT NULL,
    "email" TEXT NOT NULL,
    "name" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "collabId" INTEGER NOT NULL,

    CONSTRAINT "users_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "organisations_name_key" ON "organisations"("name");

-- CreateIndex
CREATE UNIQUE INDEX "organisations_ownerId_key" ON "organisations"("ownerId");

-- CreateIndex
CREATE UNIQUE INDEX "users_email_key" ON "users"("email");

-- AddForeignKey
ALTER TABLE "organisations" ADD CONSTRAINT "organisations_ownerId_fkey" FOREIGN KEY ("ownerId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "users" ADD CONSTRAINT "users_collabId_fkey" FOREIGN KEY ("collabId") REFERENCES "collab_orgs"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
