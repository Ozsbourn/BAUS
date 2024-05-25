/*
  Warnings:

  - You are about to drop the column `userId` on the `landingPages` table. All the data in the column will be lost.
  - You are about to drop the `organisations` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `usersOnOrganistions` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[groupId]` on the table `landingPages` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateEnum
CREATE TYPE "GroupStatus" AS ENUM ('ACTIVE', 'STOPPED', 'DELETED');

-- CreateEnum
CREATE TYPE "UserRoleInGroup" AS ENUM ('FOLLOWER', 'OWNER', 'ADMIN', 'EDITOR', 'DEVELOPER', 'DESIGNER', 'ANALYST');

-- CreateEnum
CREATE TYPE "Currency" AS ENUM ('RUB', 'USD');

-- AlterEnum
ALTER TYPE "UserStatus" ADD VALUE 'BANNED';

-- DropForeignKey
ALTER TABLE "landingPages" DROP CONSTRAINT "landingPages_userId_fkey";

-- DropForeignKey
ALTER TABLE "usersOnOrganistions" DROP CONSTRAINT "usersOnOrganistions_orgId_fkey";

-- DropForeignKey
ALTER TABLE "usersOnOrganistions" DROP CONSTRAINT "usersOnOrganistions_userId_fkey";

-- DropIndex
DROP INDEX "landingPages_userId_key";

-- AlterTable
ALTER TABLE "landingPages" DROP COLUMN "userId",
ADD COLUMN     "groupId" INTEGER NOT NULL DEFAULT -1;

-- DropTable
DROP TABLE "organisations";

-- DropTable
DROP TABLE "usersOnOrganistions";

-- DropEnum
DROP TYPE "UOStatus";

-- DropEnum
DROP TYPE "UserRoleInOrganisation";

-- CreateTable
CREATE TABLE "groups" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR(256) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "avatarUrl" VARCHAR(256) NOT NULL,
    "status" "GroupStatus" NOT NULL,

    CONSTRAINT "groups_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "equityParts" (
    "id" SERIAL NOT NULL,
    "groupId" INTEGER NOT NULL,
    "userId" INTEGER NOT NULL,
    "capital" INTEGER NOT NULL,
    "currency" "Currency" NOT NULL,

    CONSTRAINT "equityParts_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "usersOnGroups" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,
    "userRole" "UserRoleInGroup" NOT NULL,
    "groupId" INTEGER NOT NULL,

    CONSTRAINT "usersOnGroups_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "landingPages_groupId_key" ON "landingPages"("groupId");

-- AddForeignKey
ALTER TABLE "equityParts" ADD CONSTRAINT "equityParts_groupId_fkey" FOREIGN KEY ("groupId") REFERENCES "groups"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "equityParts" ADD CONSTRAINT "equityParts_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "usersOnGroups" ADD CONSTRAINT "usersOnGroups_groupId_fkey" FOREIGN KEY ("groupId") REFERENCES "groups"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "usersOnGroups" ADD CONSTRAINT "usersOnGroups_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "landingPages" ADD CONSTRAINT "landingPages_groupId_fkey" FOREIGN KEY ("groupId") REFERENCES "groups"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
