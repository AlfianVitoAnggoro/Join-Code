-- AlterTable
ALTER TABLE "VerificationToken" ADD COLUMN     "verificationTokenId" SERIAL NOT NULL,
ADD CONSTRAINT "VerificationToken_pkey" PRIMARY KEY ("verificationTokenId");
