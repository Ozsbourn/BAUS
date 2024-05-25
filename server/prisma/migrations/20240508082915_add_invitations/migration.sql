-- AlterTable
ALTER TABLE "invitations" ADD COLUMN     "isUsed" BOOLEAN NOT NULL DEFAULT false;

-- CreateIndex
CREATE INDEX "groups_urlName_idx" ON "groups"("urlName");
