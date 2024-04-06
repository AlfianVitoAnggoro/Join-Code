import prisma from '@/lib/prisma';
async function getTeamCompetitionService() {
  const teamCompetitions = await prisma.teamCompetition.findMany(); // Find all data in table.
  return teamCompetitions;
}

async function getDetailTeamCompetitionService(competitionId, teamId) {
  const teamCompetition = await prisma.teamCompetition.findUnique({
    where: {
      teamId_competitionId: {
        competitionId: Number(competitionId),
        teamId: Number(teamId),
      },
    },
    include: {
      statusTeamCompetition: true,
      team: {
        include: {
          softwareDevelopers: {
            include: {
              softwareDeveloper: {
                include: {
                  user: true,
                },
              },
            },
          },
        },
      },
    },
  });
  return teamCompetition;
}

async function getTeamCompetitionByFilterService(competitionId) {
  const teamCompetition = await prisma.teamCompetition.findMany({
    where: {
      competitionId: Number(competitionId),
      isAccepted: true,
      statusTeamCompetitionId: 2,
      projectLink: { not: null },
      repositoryLink: { not: null },
    },
    include: {
      team: true,
    },
  });
  return teamCompetition;
}

async function deleteTeamCompetitionService(competitionId, teamId) {
  const teamCompetition = await prisma.teamCompetition.delete({
    where: {
      teamId_competitionId: {
        competitionId: Number(competitionId),
        teamId: Number(teamId),
      },
    },
  });
  return teamCompetition;
}

async function checkAvailableUserInTeamCompetititonService(
  competitionId,
  teamId,
  collaborationId,
) {
  const teamCompetition = await prisma.teamCompetition.findUnique({
    where: {
      teamId_competitionId: {
        competitionId: Number(competitionId),
        teamId: Number(teamId),
      },
    },
    include: {
      statusTeamCompetition: true,
      team: {
        include: {
          softwareDevelopers: {
            where: {
              softwareDeveloper: {
                collaborationId: collaborationId,
              },
            },
          },
        },
      },
    },
  });
  return teamCompetition;
}

async function checkAvailableUserInTeamCompetititonWithoutTeamIdService(
  competitionId,
  collaborationId,
) {
  const teamCompetition = await prisma.teamCompetition.findUnique({
    where: {
      competitionId: Number(competitionId),
    },
    include: {
      statusTeamCompetition: true,
      team: {
        include: {
          softwareDevelopers: {
            where: {
              softwareDeveloper: {
                collaborationId: collaborationId,
              },
            },
          },
        },
      },
    },
  });
  return teamCompetition;
}

async function acceptTeamCompetitionService(competitionId, teamId) {
  const teamCompetition = await prisma.teamCompetition.update({
    where: {
      teamId_competitionId: {
        competitionId: Number(competitionId),
        teamId: Number(teamId),
      },
    },
    data: {
      isAccepted: true,
      statusTeamCompetitionId: 2,
    },
  });

  if (teamCompetition) {
    const competition = await prisma.competition.findUnique({
      where: {
        competitionId: Number(competitionId),
      },
      include: {
        teams: {
          where: {
            isAccepted: true,
          },
        },
      },
    });

    if (competition.teams.length === competition.maxTeam) {
      await prisma.teamCompetition.updateMany({
        where: {
          competitionId: Number(competitionId),
          isAccepted: false,
        },
        data: {
          statusTeamCompetitionId: 6,
        },
      });
    }
  }
  return teamCompetition;
}

async function updateStatusTeamCompetitionService(competitionId, teamId) {
  const teamCompetition = await prisma.teamCompetition.update({
    where: {
      teamId_competitionId: {
        competitionId: Number(competitionId),
        teamId: Number(teamId),
      },
      isAccepted: true,
      statusTeamCompetitionId: 2,
    },
    data: {
      statusTeamCompetitionId: 3,
    },
  });
  return teamCompetition;
}

export {
  getTeamCompetitionService,
  getDetailTeamCompetitionService,
  getTeamCompetitionByFilterService,
  deleteTeamCompetitionService,
  checkAvailableUserInTeamCompetititonService,
  checkAvailableUserInTeamCompetititonWithoutTeamIdService,
  acceptTeamCompetitionService,
  updateStatusTeamCompetitionService,
};
