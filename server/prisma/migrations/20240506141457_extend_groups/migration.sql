/*
  Warnings:

  - You are about to alter the column `name` on the `groups` table. The data in that column could be lost. The data in that column will be cast from `VarChar(256)` to `VarChar(100)`.
  - A unique constraint covering the columns `[urlName]` on the table `groups` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateEnum
CREATE TYPE "InviteStatus" AS ENUM ('PENDING', 'ACCEPTED', 'REJECTED', 'DELETED');

-- AlterTable
ALTER TABLE "groups" ALTER COLUMN "name" SET DATA TYPE VARCHAR(100),
ALTER COLUMN "description" DROP NOT NULL,
ALTER COLUMN "description" SET DATA TYPE VARCHAR(300);

-- CreateIndex
CREATE UNIQUE INDEX "groups_urlName_key" ON "groups"("urlName");
