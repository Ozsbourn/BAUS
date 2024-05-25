/*
  Warnings:

  - Changed the type of `status` on the `users` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `status` on the `usersOnOrganistions` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- CreateEnum
CREATE TYPE "UserStatus" AS ENUM ('ACTIVE', 'PENDING', 'DELETED');

-- CreateEnum
CREATE TYPE "UOStatus" AS ENUM ('ACTIVE', 'STOPPED', 'DELETED');

-- AlterTable
ALTER TABLE "users" DROP COLUMN "status",
ADD COLUMN     "status" "UserStatus" NOT NULL;

-- AlterTable
ALTER TABLE "usersOnOrganistions" DROP COLUMN "status",
ADD COLUMN     "status" "UOStatus" NOT NULL;

-- DropEnum
DROP TYPE "UOStatuses";

-- DropEnum
DROP TYPE "UserStatuses";
