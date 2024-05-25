/*
  Warnings:

  - Added the required column `bannerUrl` to the `groups` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "groups" ADD COLUMN     "bannerUrl" VARCHAR(256) NOT NULL;
