/*
  Warnings:

  - Added the required column `resource` to the `collab_orgs` table without a default value. This is not possible if the table is not empty.
  - Made the column `name` on table `users` required. This step will fail if there are existing NULL values in that column.

*/
-- DropIndex
DROP INDEX "users_collabId_key";

-- AlterTable
ALTER TABLE "collab_orgs" ADD COLUMN     "resource" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "users" ALTER COLUMN "name" SET NOT NULL;
