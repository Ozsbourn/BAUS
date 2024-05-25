/*
  Warnings:

  - Added the required column `description` to the `groups` table without a default value. This is not possible if the table is not empty.
  - Added the required column `urlName` to the `groups` table without a default value. This is not possible if the table is not empty.

*/
-- AlterEnum
ALTER TYPE "GroupStatus" ADD VALUE 'BANNED';

-- AlterTable
ALTER TABLE "groups" ADD COLUMN     "description" VARCHAR(100) NOT NULL,
ADD COLUMN     "urlName" VARCHAR(20) NOT NULL;
