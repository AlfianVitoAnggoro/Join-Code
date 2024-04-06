-- DropForeignKey
ALTER TABLE "softwareDevelopers" DROP CONSTRAINT "softwareDevelopers_badgeId_fkey";

-- DropForeignKey
ALTER TABLE "softwareDevelopers" DROP CONSTRAINT "softwareDevelopers_statusCollaborationId_fkey";

-- AlterTable
ALTER TABLE "softwareDevelopers" ALTER COLUMN "badgeId" DROP NOT NULL,
ALTER COLUMN "statusCollaborationId" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "softwareDevelopers" ADD CONSTRAINT "softwareDevelopers_badgeId_fkey" FOREIGN KEY ("badgeId") REFERENCES "badges"("badgeId") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "softwareDevelopers" ADD CONSTRAINT "softwareDevelopers_statusCollaborationId_fkey" FOREIGN KEY ("statusCollaborationId") REFERENCES "statusCollaborations"("statusCollaborationId") ON DELETE SET NULL ON UPDATE CASCADE;
