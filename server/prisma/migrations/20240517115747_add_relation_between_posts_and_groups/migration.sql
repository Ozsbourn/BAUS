/*
  Warnings:

  - Added the required column `groupId` to the `posts` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "posts" ADD COLUMN     "groupId" INTEGER NOT NULL,
ADD COLUMN     "label" VARCHAR(128);

-- AddForeignKey
ALTER TABLE "posts" ADD CONSTRAINT "posts_groupId_fkey" FOREIGN KEY ("groupId") REFERENCES "groups"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
