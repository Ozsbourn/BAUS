/*
  Warnings:

  - You are about to drop the column `ownerId` on the `organisations` table. All the data in the column will be lost.
  - You are about to alter the column `name` on the `organisations` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(100)`.
  - You are about to drop the column `collabId` on the `users` table. All the data in the column will be lost.
  - You are about to alter the column `email` on the `users` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(256)`.
  - You are about to alter the column `name` on the `users` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(100)`.
  - You are about to drop the `collab_orgs` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `login` to the `users` table without a default value. This is not possible if the table is not empty.
  - Added the required column `passHash` to the `users` table without a default value. This is not possible if the table is not empty.
  - Added the required column `status` to the `users` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "UserStatuses" AS ENUM ('ACTIVE', 'PENDING', 'DELETED');

-- CreateEnum
CREATE TYPE "UOStatuses" AS ENUM ('ACTIVE', 'STOPPED', 'DELETED');

-- CreateEnum
CREATE TYPE "UserRoleInOrganisation" AS ENUM ('OWNER', 'ADMIN', 'EDITOR', 'DEVELOPER', 'DESIGNER', 'ANALYST');

-- DropForeignKey
ALTER TABLE "organisations" DROP CONSTRAINT "organisations_ownerId_fkey";

-- DropForeignKey
ALTER TABLE "users" DROP CONSTRAINT "users_collabId_fkey";

-- DropIndex
DROP INDEX "organisations_ownerId_key";

-- AlterTable
ALTER TABLE "organisations" DROP COLUMN "ownerId",
ALTER COLUMN "name" SET DATA TYPE VARCHAR(100);

-- AlterTable
ALTER TABLE "users" DROP COLUMN "collabId",
ADD COLUMN     "login" VARCHAR(100) NOT NULL,
ADD COLUMN     "passHash" VARCHAR(64) NOT NULL,
ADD COLUMN     "status" "UserStatuses" NOT NULL,
ALTER COLUMN "email" SET DATA TYPE VARCHAR(256),
ALTER COLUMN "name" SET DATA TYPE VARCHAR(100);

-- DropTable
DROP TABLE "collab_orgs";

-- CreateTable
CREATE TABLE "usersOnOrganistions" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,
    "userRole" "UserRoleInOrganisation" NOT NULL,
    "orgId" INTEGER NOT NULL,
    "status" "UOStatuses" NOT NULL,

    CONSTRAINT "usersOnOrganistions_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "usersOnOrganistions" ADD CONSTRAINT "usersOnOrganistions_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "usersOnOrganistions" ADD CONSTRAINT "usersOnOrganistions_orgId_fkey" FOREIGN KEY ("orgId") REFERENCES "organisations"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
