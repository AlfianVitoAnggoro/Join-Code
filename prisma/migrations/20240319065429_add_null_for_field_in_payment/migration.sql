-- AlterTable
ALTER TABLE "payments" ALTER COLUMN "name" DROP NOT NULL,
ALTER COLUMN "service" DROP NOT NULL,
ALTER COLUMN "noVirtualAccount" DROP NOT NULL;
