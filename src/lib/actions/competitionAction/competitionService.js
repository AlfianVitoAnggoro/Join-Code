'use server';
import prisma from '@/lib/prisma';

async function getCompetitionService() {
  const competitions = await prisma.competition.findMany({
    include: {
      category: true,
      type: true,
      organization: {
        include: {
          user: true,
        },
      },
    },
  });
  return competitions;
}

async function getCompetitionByRegistrationDateService(nowDate) {
  const competitions = await prisma.competition.findMany({
    where: {
      registrationStartDate: { lte: nowDate },
      registrationEndDate: { gte: nowDate },
      isCompleted: false,
    },
    include: {
      category: true,
      type: true,
      organization: {
        include: {
          user: true,
        },
      },
    },
  });
  return competitions;
}

async function getDetailCompetitionService(competitionId) {
  const competition = await prisma.competition.findUnique({
    where: {
      competitionId: Number(competitionId),
    },
    include: {
      category: true,
      type: true,
      organization: {
        include: {
          user: true,
          payment: true,
        },
      },
      teams: {
        include: {
          team: {
            include: {
              softwareDevelopers: true,
            },
          },
        },
      },
    },
  });

  return competition;
}

async function updateCompetitionService(competitionId, data) {
  const competition = await prisma.competition.update({
    where: {
      competitionId: Number(competitionId),
    },
    data: data,
  });
  return competition;
}

async function createCompetitionService(data) {
  const competition = await prisma.competition.create({
    data: data,
  });
  return competition;
}

async function deleteCompetitionService(competitionId) {
  const competition = await prisma.competition.delete({
    where: {
      competitionId: Number(competitionId),
    },
  });
  return competition;
}

async function completeCompetitionService(competitionId, data) {
  // Leadeboard season by this time
  const leaderboard = await prisma.leaderboard.findFirst({
    where: {
      startDate: {
        lte: new Date(),
      },
      endDate: {
        gte: new Date(),
      },
    },
  });

  // Give point by ranking team
  data.ranking.map(async (rank, index) => {
    // Perbarui peringkat tim dalam kompetisi
    await prisma.teamCompetition.update({
      where: {
        teamId_competitionId: {
          competitionId: Number(competitionId),
          teamId: Number(rank),
        },
      },
      data: {
        ranking: Number(index + 1),
      },
    });

    // Perbarui poin untuk setiap software developer dalam tim
    const team = await prisma.team.findUnique({
      where: {
        teamId: Number(rank),
      },
      include: {
        softwareDevelopers: {
          include: {
            softwareDeveloper: true,
          },
        },
      },
    });

    if (team) {
      team.softwareDevelopers.forEach(async softwareDeveloper => {
        let point = 0;
        switch (index) {
          case 0:
            point = 100;
            break;
          case 1:
            point = 50;
            break;
          case 2:
            point = 30;
            break;
          default:
            point = 10;
        }

        await prisma.softwareDeveloper.update({
          where: {
            collaborationId: softwareDeveloper.collaborationId,
          },
          data: {
            point: {
              increment: point, // Menambahkan poin
            },
          },
        });

        const leaderboardSoftwareDeveloper =
          await prisma.leaderboardSoftwareDeveloper.update({
            where: {
              leaderboardId_softwareDeveloperId: {
                leaderboardId: leaderboard.leaderboardId,
                softwareDeveloperId:
                  softwareDeveloper.softwareDeveloper.softwareDeveloperId,
              },
            },
            data: {
              point_leaderboard: {
                increment: point, // Menambahkan poin
              },
            },
          });
      });
    }
  });

  // Update status team has collect the project
  const updateStatusTeamCompetitionFinish =
    await prisma.teamCompetition.updateMany({
      where: {
        competitionId: Number(competitionId),
        isAccepted: true,
        projectLink: { not: null },
        repositoryLink: { not: null },
      },
      data: {
        statusTeamCompetitionId: 4,
      },
    });

  // Update status team has not collect the project
  const updateStatusTeamCompetitionNotFinish =
    await prisma.teamCompetition.updateMany({
      where: {
        competitionId: Number(competitionId),
        isAccepted: true,
        projectLink: null,
        repositoryLink: null,
      },
      data: {
        statusTeamCompetitionId: 5,
      },
    });

  // Give point by team not in the rank
  const teamCompetitionFinishButNotChampion =
    await prisma.teamCompetition.findMany({
      where: {
        competitionId: Number(competitionId),
        statusTeamCompetitionId: 4,
        ranking: null,
      },
      include: {
        team: {
          include: {
            softwareDevelopers: {
              include: {
                softwareDeveloper: true,
              },
            },
          },
        },
      },
    });

  if (teamCompetitionFinishButNotChampion) {
    teamCompetitionFinishButNotChampion.forEach(async teamCompetitions => {
      teamCompetitions.team.softwareDevelopers.forEach(
        async softwareDeveloper => {
          let point = 10;

          await prisma.softwareDeveloper.update({
            where: {
              collaborationId: softwareDeveloper.collaborationId,
            },
            data: {
              point: {
                increment: point, // Menambahkan poin
              },
            },
          });

          const leaderboardSoftwareDeveloper =
            await prisma.leaderboardSoftwareDeveloper.update({
              where: {
                leaderboardId_softwareDeveloperId: {
                  leaderboardId: leaderboard.leaderboardId,
                  softwareDeveloperId:
                    softwareDeveloper.softwareDeveloper.softwareDeveloperId,
                },
              },
              data: {
                point_leaderboard: {
                  increment: point, // Menambahkan poin
                },
              },
            });
        },
      );
    });
  }

  // Update Badge every software developer by point
  const teamCompetitionUpdateBadge = await prisma.teamCompetition.findMany({
    where: {
      competitionId: Number(competitionId),
      statusTeamCompetitionId: 4,
    },
    include: {
      team: {
        include: {
          softwareDevelopers: {
            include: {
              softwareDeveloper: true,
            },
          },
        },
      },
    },
  });

  if (teamCompetitionUpdateBadge) {
    teamCompetitionUpdateBadge.forEach(async teamCompetitions => {
      teamCompetitions.team.softwareDevelopers.forEach(
        async softwareDeveloper => {
          const softwareDeveloperUpdate =
            await prisma.softwareDeveloper.findUnique({
              where: {
                collaborationId: softwareDeveloper.collaborationId,
              },
              select: {
                softwareDeveloperId: true,
                point: true,
                badgeId: true,
              },
            });

          // update badge
          if (Number(softwareDeveloperUpdate.point) >= 500) {
            if (softwareDeveloperUpdate.badgeId === 3) return;

            await prisma.softwareDeveloper.update({
              where: {
                softwareDeveloperId:
                  softwareDeveloperUpdate.softwareDeveloperId,
              },
              data: {
                badgeId: 3,
              },
            });
          } else if (Number(softwareDeveloperUpdate.point) >= 200) {
            if (softwareDeveloperUpdate.badgeId === 2) return;
            await prisma.softwareDeveloper.update({
              where: {
                softwareDeveloperId:
                  softwareDeveloperUpdate.softwareDeveloperId,
              },
              data: {
                badgeId: 2,
              },
            });
          }
        },
      );
    });
  }

  // update competition to completed
  const competition = await prisma.competition.update({
    where: {
      competitionId: Number(competitionId),
    },
    data: {
      isCompleted: true,
    },
  });
  return competition;
}

async function competitionRegistrationService(competitionId, data) {
  const team = await prisma.team.create({
    data: {
      name: data.name,
    },
  });

  await prisma.teamCompetition.create({
    data: {
      teamId: team.teamId,
      competitionId: Number(competitionId),
      statusTeamCompetitionId: 1,
      proofOfPayment: data.proofOfPayment,
    },
  });

  await Promise.all(
    data.members.map(async member => {
      await prisma.teamSoftwareDeveloper.create({
        data: {
          teamId: team.teamId,
          collaborationId: member,
        },
      });
    }),
  );
}

async function submitProjectCompetitionService(competitionId, teamId, data) {
  const teamCompetition = await prisma.teamCompetition.update({
    where: {
      teamId_competitionId: {
        teamId: Number(teamId),
        competitionId: Number(competitionId),
      },
    },
    data: data,
  });
  return teamCompetition;
}

export {
  getCompetitionService,
  getDetailCompetitionService,
  updateCompetitionService,
  createCompetitionService,
  deleteCompetitionService,
  completeCompetitionService,
  competitionRegistrationService,
  submitProjectCompetitionService,
  getCompetitionByRegistrationDateService,
};
