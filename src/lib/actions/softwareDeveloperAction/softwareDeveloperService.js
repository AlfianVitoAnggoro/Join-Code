import prisma from '@/lib/prisma';
async function getSoftwareDeveloperService() {
  const softwareDevelopers = await prisma.softwareDeveloper.findMany({
    where: {
      statusCollaboration: true,
    },
    include: {
      user: true,
      skills: {
        include: {
          skill: true,
        },
      },
      badge: true,
    },
  }); // Find all data in table.
  return softwareDevelopers;
}

async function getDetailSoftwareDeveloperService(softwareDeveloperId) {
  const softwareDeveloper = await prisma.softwareDeveloper.findUnique({
    where: {
      softwareDeveloperId: Number(softwareDeveloperId),
    },
    include: {
      user: true,
      skills: {
        include: {
          skill: true,
        },
      },
      badge: true,
      teams: {
        include: {
          team: {
            include: {
              competitions: {
                where: {
                  statusTeamCompetitionId: 4,
                },
                include: {
                  statusTeamCompetition: true,
                  competition: {
                    include: {
                      category: true,
                      organization: {
                        include: {
                          user: true,
                        },
                      },
                    },
                  },
                },
              },
            },
          },
        },
      },
    },
  });
  return softwareDeveloper;
}

async function getDetailSoftwareDeveloperStatusTeamCompetitionFinishService(
  nickname,
) {
  const softwareDeveloper = await prisma.user.findUnique({
    where: {
      nickname: nickname,
      roleId: 1,
    },
    include: {
      softwareDevelopers: {
        include: {
          skills: {
            include: {
              skill: true,
            },
          },
          badge: true,
          teams: {
            include: {
              team: {
                include: {
                  competitions: {
                    where: {
                      statusTeamCompetitionId: 4,
                    },
                    include: {
                      statusTeamCompetition: true,
                      competition: {
                        include: {
                          category: true,
                          type: true,
                          organization: {
                            include: {
                              user: true,
                            },
                          },
                        },
                      },
                    },
                  },
                },
              },
            },
          },
        },
      },
      role: true,
    },
  });
  return softwareDeveloper;
}

async function checkSoftwareDeveloperByUserId(userId) {
  const user = await prisma.user.findUnique({
    where: {
      userId: userId,
    },
    select: {
      userId: true,
    },
  });
  return user;
}

async function updateSoftwareDeveloperService(userId, data) {
  const dataUser = {
    name: data.name,
  };

  if (data?.isEmailVerified != undefined) {
    dataUser.isEmailVerified = JSON.parse(data?.isEmailVerified);
  }

  if (data.avatar) {
    dataUser.avatar = data.avatar;
  }

  if (data.email) {
    dataUser.email = data.email;
  }

  const user = await prisma.user.update({
    where: {
      userId: userId,
    },
    data: dataUser,
  });

  const dataSoftwareDeveloper = {
    gender: data.gender,
    address: data.address,
    description: data.description,
    statusCollaboration: JSON.parse(data.statusCollaboration),
    portfolioLink: data.portfolioLink,
    usernameGithub: data.usernameGithub,
    usernameLinkedin: data.usernameLinkedin,
    usernameInstagram: data.usernameInstagram,
  };

  await prisma.softwareDeveloper.update({
    where: {
      userId: userId,
    },
    data: dataSoftwareDeveloper,
  });

  if (data.skills.length === 0) {
    await prisma.softwareDeveloper.update({
      where: {
        userId: userId,
      },
      data: {
        skills: {
          deleteMany: {},
        },
      },
    });
  } else if (data.skills[0].value) {
    await prisma.softwareDeveloper.update({
      where: {
        userId: userId,
      },
      data: {
        skills: {
          deleteMany: {},
        },
      },
    });

    await prisma.softwareDeveloper.update({
      where: {
        userId: userId,
      },
      data: {
        skills: {
          create: data.skills.map(skill => ({
            skillId: skill.value,
          })),
        },
      },
    });
  }

  return user;
}

export {
  getSoftwareDeveloperService,
  getDetailSoftwareDeveloperService,
  checkSoftwareDeveloperByUserId,
  updateSoftwareDeveloperService,
  getDetailSoftwareDeveloperStatusTeamCompetitionFinishService,
};
