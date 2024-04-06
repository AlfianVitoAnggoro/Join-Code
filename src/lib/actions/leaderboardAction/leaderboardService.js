import prisma from '@/lib/prisma';
async function getLeaderboardFilterByDateService(nowDate) {
  const leaderboard = await prisma.leaderboard.findFirst({
    where: {
      startDate: {
        lte: nowDate,
      },
      endDate: {
        gte: nowDate,
      },
    },
    include: {
      softwareDevelopers: {
        include: {
          softwareDeveloper: {
            include: {
              user: true,
            },
          },
        },
        orderBy: {
          point_leaderboard: 'desc',
        },
      },
    },
  });
  return leaderboard;
}

async function getUserLeaderboardBySoftwareDeveloperId(
  nowDate,
  softwareDeveloperId,
) {
  const leaderboard = await prisma.leaderboard.findFirst({
    where: {
      startDate: {
        lte: nowDate,
      },
      endDate: {
        gte: nowDate,
      },
    },
    include: {
      softwareDevelopers: {
        where: {
          softwareDeveloperId: softwareDeveloperId,
        },
        include: {
          softwareDeveloper: {
            include: {
              user: true,
            },
          },
        },
      },
    },
  });
  return leaderboard;
}

export {
  getLeaderboardFilterByDateService,
  getUserLeaderboardBySoftwareDeveloperId,
};
