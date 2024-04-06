/*
  Warnings:

  - You are about to drop the column `statusCollaborationId` on the `softwareDevelopers` table. All the data in the column will be lost.
  - You are about to drop the `statusCollaborations` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "softwareDevelopers" DROP CONSTRAINT "softwareDevelopers_statusCollaborationId_fkey";

-- AlterTable
ALTER TABLE "softwareDevelopers" DROP COLUMN "statusCollaborationId",
ADD COLUMN     "statusCollaboration" BOOLEAN NOT NULL DEFAULT false;

-- DropTable
DROP TABLE "statusCollaborations";
