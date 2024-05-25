-- CreateTable
CREATE TABLE "invitations" (
    "id" SERIAL NOT NULL,
    "email" VARCHAR(256) NOT NULL,
    "role" "UserRoleInGroup" NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "expires" TIMESTAMP(3) NOT NULL,
    "groupId" INTEGER NOT NULL,

    CONSTRAINT "invitations_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "invitations_groupId_idx" ON "invitations"("groupId");

-- CreateIndex
CREATE UNIQUE INDEX "invitations_email_groupId_key" ON "invitations"("email", "groupId");

-- AddForeignKey
ALTER TABLE "invitations" ADD CONSTRAINT "invitations_groupId_fkey" FOREIGN KEY ("groupId") REFERENCES "groups"("id") ON DELETE CASCADE ON UPDATE CASCADE;
