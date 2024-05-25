/*
  Warnings:

  - A unique constraint covering the columns `[userId]` on the table `landingPages` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `isDraft` to the `flowDiagramms` table without a default value. This is not possible if the table is not empty.
  - Added the required column `isDraft` to the `landingPages` table without a default value. This is not possible if the table is not empty.
  - Added the required column `userId` to the `landingPages` table without a default value. This is not possible if the table is not empty.
  - Added the required column `avatarUrl` to the `users` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "flowDiagramms" ADD COLUMN     "isDraft" BOOLEAN NOT NULL;

-- AlterTable
ALTER TABLE "landingPages" ADD COLUMN     "isDraft" BOOLEAN NOT NULL,
ADD COLUMN     "userId" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "users" ADD COLUMN     "avatarUrl" VARCHAR(256) NOT NULL;

-- CreateTable
CREATE TABLE "posts" (
    "id" SERIAL NOT NULL,
    "text" VARCHAR(256) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "posts_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "landingPages_userId_key" ON "landingPages"("userId");

-- AddForeignKey
ALTER TABLE "landingPages" ADD CONSTRAINT "landingPages_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
