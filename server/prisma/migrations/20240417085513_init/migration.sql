/*
  Warnings:

  - A unique constraint covering the columns `[collabId]` on the table `users` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "users_collabId_key" ON "users"("collabId");