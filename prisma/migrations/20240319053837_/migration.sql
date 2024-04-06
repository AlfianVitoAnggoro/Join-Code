-- CreateEnum
CREATE TYPE "Gender" AS ENUM ('Male', 'Female');

-- CreateTable
CREATE TABLE "users" (
    "userId" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "avatar" TEXT,
    "isEmailVerified" BOOLEAN NOT NULL DEFAULT false,
    "roleId" INTEGER NOT NULL,

    CONSTRAINT "users_pkey" PRIMARY KEY ("userId")
);

-- CreateTable
CREATE TABLE "softwareDevelopers" (
    "softwareDeveloperId" SERIAL NOT NULL,
    "description" TEXT,
    "gender" "Gender",
    "address" TEXT,
    "portfolioLink" TEXT,
    "usernameGithub" TEXT,
    "usernameInstagram" TEXT,
    "usernameLinkedin" TEXT,
    "collaborationId" TEXT NOT NULL,
    "point" INTEGER NOT NULL DEFAULT 0,
    "userId" TEXT NOT NULL,
    "badgeId" INTEGER NOT NULL DEFAULT 1,
    "statusCollaborationId" INTEGER NOT NULL DEFAULT 1,

    CONSTRAINT "softwareDevelopers_pkey" PRIMARY KEY ("softwareDeveloperId")
);

-- CreateTable
CREATE TABLE "organizations" (
    "organizationId" SERIAL NOT NULL,
    "description" TEXT,
    "address" TEXT,
    "organizationLink" TEXT,
    "document" TEXT,
    "isValidDocument" BOOLEAN NOT NULL DEFAULT false,
    "userId" TEXT NOT NULL,
    "paymentId" INTEGER,

    CONSTRAINT "organizations_pkey" PRIMARY KEY ("organizationId")
);

-- CreateTable
CREATE TABLE "admins" (
    "adminId" SERIAL NOT NULL,
    "userId" TEXT NOT NULL,

    CONSTRAINT "admins_pkey" PRIMARY KEY ("adminId")
);

-- CreateTable
CREATE TABLE "roles" (
    "roleId" SERIAL NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "roles_pkey" PRIMARY KEY ("roleId")
);

-- CreateTable
CREATE TABLE "badges" (
    "badgeId" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "image" TEXT NOT NULL,
    "point" INTEGER NOT NULL,

    CONSTRAINT "badges_pkey" PRIMARY KEY ("badgeId")
);

-- CreateTable
CREATE TABLE "statusCollaborations" (
    "statusCollaborationId" SERIAL NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "statusCollaborations_pkey" PRIMARY KEY ("statusCollaborationId")
);

-- CreateTable
CREATE TABLE "payments" (
    "paymentId" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "service" TEXT NOT NULL,
    "noVirtualAccount" TEXT NOT NULL,

    CONSTRAINT "payments_pkey" PRIMARY KEY ("paymentId")
);

-- CreateTable
CREATE TABLE "competitions" (
    "competitionId" SERIAL NOT NULL,
    "name" VARCHAR(255) NOT NULL,
    "place" VARCHAR(255),
    "description" TEXT NOT NULL,
    "maxMemberTeam" INTEGER,
    "maxTeam" INTEGER,
    "registrationStartDate" TIMESTAMP(3) NOT NULL,
    "registrationEndDate" TIMESTAMP(3) NOT NULL,
    "registrationFee" INTEGER,
    "startDate" TIMESTAMP(3) NOT NULL,
    "endDate" TIMESTAMP(3) NOT NULL,
    "isCompleted" BOOLEAN NOT NULL DEFAULT false,
    "categoryId" INTEGER NOT NULL,
    "typeId" INTEGER NOT NULL,
    "organizationId" INTEGER NOT NULL,

    CONSTRAINT "competitions_pkey" PRIMARY KEY ("competitionId")
);

-- CreateTable
CREATE TABLE "types" (
    "typeId" SERIAL NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "types_pkey" PRIMARY KEY ("typeId")
);

-- CreateTable
CREATE TABLE "categories" (
    "categoryId" SERIAL NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "categories_pkey" PRIMARY KEY ("categoryId")
);

-- CreateTable
CREATE TABLE "statusTeamCompetition" (
    "statusTeamCompetitionId" SERIAL NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "statusTeamCompetition_pkey" PRIMARY KEY ("statusTeamCompetitionId")
);

-- CreateTable
CREATE TABLE "teamCompetition" (
    "projectLink" TEXT,
    "repositoryLink" TEXT,
    "ranking" INTEGER,
    "proofOfPayment" TEXT,
    "isAccepted" BOOLEAN NOT NULL DEFAULT false,
    "statusTeamCompetitionId" INTEGER NOT NULL DEFAULT 1,
    "teamId" INTEGER NOT NULL,
    "competitionId" INTEGER NOT NULL,

    CONSTRAINT "teamCompetition_pkey" PRIMARY KEY ("teamId","competitionId")
);

-- CreateTable
CREATE TABLE "teams" (
    "teamId" SERIAL NOT NULL,
    "name" TEXT,

    CONSTRAINT "teams_pkey" PRIMARY KEY ("teamId")
);

-- CreateTable
CREATE TABLE "teamSoftwareDeveloper" (
    "teamId" INTEGER NOT NULL,
    "collaborationId" TEXT NOT NULL,

    CONSTRAINT "teamSoftwareDeveloper_pkey" PRIMARY KEY ("teamId","collaborationId")
);

-- CreateTable
CREATE TABLE "leaderboards" (
    "leaderboardId" SERIAL NOT NULL,
    "season" INTEGER NOT NULL,
    "startDate" TIMESTAMP(3) NOT NULL,
    "endDate" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "leaderboards_pkey" PRIMARY KEY ("leaderboardId")
);

-- CreateTable
CREATE TABLE "leaderboardSoftwareDeveloper" (
    "leaderboardId" INTEGER NOT NULL,
    "softwareDeveloperId" INTEGER NOT NULL,

    CONSTRAINT "leaderboardSoftwareDeveloper_pkey" PRIMARY KEY ("leaderboardId","softwareDeveloperId")
);

-- CreateTable
CREATE TABLE "skills" (
    "skillId" SERIAL NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "skills_pkey" PRIMARY KEY ("skillId")
);

-- CreateTable
CREATE TABLE "skillSoftwareDeveloper" (
    "skillId" INTEGER NOT NULL,
    "softwareDeveloperId" INTEGER NOT NULL,

    CONSTRAINT "skillSoftwareDeveloper_pkey" PRIMARY KEY ("skillId","softwareDeveloperId")
);

-- CreateIndex
CREATE UNIQUE INDEX "users_email_key" ON "users"("email");

-- CreateIndex
CREATE UNIQUE INDEX "softwareDevelopers_collaborationId_key" ON "softwareDevelopers"("collaborationId");

-- CreateIndex
CREATE UNIQUE INDEX "softwareDevelopers_userId_key" ON "softwareDevelopers"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "organizations_userId_key" ON "organizations"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "organizations_paymentId_key" ON "organizations"("paymentId");

-- CreateIndex
CREATE UNIQUE INDEX "admins_userId_key" ON "admins"("userId");

-- AddForeignKey
ALTER TABLE "users" ADD CONSTRAINT "users_roleId_fkey" FOREIGN KEY ("roleId") REFERENCES "roles"("roleId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "softwareDevelopers" ADD CONSTRAINT "softwareDevelopers_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("userId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "softwareDevelopers" ADD CONSTRAINT "softwareDevelopers_badgeId_fkey" FOREIGN KEY ("badgeId") REFERENCES "badges"("badgeId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "softwareDevelopers" ADD CONSTRAINT "softwareDevelopers_statusCollaborationId_fkey" FOREIGN KEY ("statusCollaborationId") REFERENCES "statusCollaborations"("statusCollaborationId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "organizations" ADD CONSTRAINT "organizations_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("userId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "organizations" ADD CONSTRAINT "organizations_paymentId_fkey" FOREIGN KEY ("paymentId") REFERENCES "payments"("paymentId") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "admins" ADD CONSTRAINT "admins_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("userId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "competitions" ADD CONSTRAINT "competitions_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "categories"("categoryId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "competitions" ADD CONSTRAINT "competitions_typeId_fkey" FOREIGN KEY ("typeId") REFERENCES "types"("typeId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "competitions" ADD CONSTRAINT "competitions_organizationId_fkey" FOREIGN KEY ("organizationId") REFERENCES "organizations"("organizationId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "teamCompetition" ADD CONSTRAINT "teamCompetition_statusTeamCompetitionId_fkey" FOREIGN KEY ("statusTeamCompetitionId") REFERENCES "statusTeamCompetition"("statusTeamCompetitionId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "teamCompetition" ADD CONSTRAINT "teamCompetition_teamId_fkey" FOREIGN KEY ("teamId") REFERENCES "teams"("teamId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "teamCompetition" ADD CONSTRAINT "teamCompetition_competitionId_fkey" FOREIGN KEY ("competitionId") REFERENCES "competitions"("competitionId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "teamSoftwareDeveloper" ADD CONSTRAINT "teamSoftwareDeveloper_teamId_fkey" FOREIGN KEY ("teamId") REFERENCES "teams"("teamId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "teamSoftwareDeveloper" ADD CONSTRAINT "teamSoftwareDeveloper_collaborationId_fkey" FOREIGN KEY ("collaborationId") REFERENCES "softwareDevelopers"("collaborationId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "leaderboardSoftwareDeveloper" ADD CONSTRAINT "leaderboardSoftwareDeveloper_leaderboardId_fkey" FOREIGN KEY ("leaderboardId") REFERENCES "leaderboards"("leaderboardId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "leaderboardSoftwareDeveloper" ADD CONSTRAINT "leaderboardSoftwareDeveloper_softwareDeveloperId_fkey" FOREIGN KEY ("softwareDeveloperId") REFERENCES "softwareDevelopers"("softwareDeveloperId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "skillSoftwareDeveloper" ADD CONSTRAINT "skillSoftwareDeveloper_skillId_fkey" FOREIGN KEY ("skillId") REFERENCES "skills"("skillId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "skillSoftwareDeveloper" ADD CONSTRAINT "skillSoftwareDeveloper_softwareDeveloperId_fkey" FOREIGN KEY ("softwareDeveloperId") REFERENCES "softwareDevelopers"("softwareDeveloperId") ON DELETE RESTRICT ON UPDATE CASCADE;
