import prisma from '@/lib/prisma';
import bcrypt from 'bcrypt';
async function getUserService() {
  const users = await prisma.user.findMany({
    include: {
      role: true,
    },
  }); // Find all data in table.
  return users;
}

async function createUserService(data) {
  const hashPassword = await bcrypt.hash(data.password, 10);
  const dataUser = {
    name: data.name,
    nickname: data.nickname.toLowerCase(),
    email: data.email,
    password: hashPassword,
    roleId: data.roleId,
    avatar: data.avatar,
  };
  const user = await prisma.user.create({
    data: dataUser,
  });

  if (user.roleId == 1) {
    const softwareDeveloper = await prisma.softwareDeveloper.create({
      data: {
        userId: user.userId,
      },
    });

    const leaderboard = await prisma.leaderboard.findFirst({
      where: {
        startDate: {
          lte: new Date(),
        },
        endDate: {
          gte: new Date(),
        },
      },
      select: {
        leaderboardId: true,
      },
    });

    const leaderboardSoftwareDeveloper =
      await prisma.leaderboardSoftwareDeveloper.create({
        data: {
          leaderboardId: leaderboard.leaderboardId,
          softwareDeveloperId: softwareDeveloper.softwareDeveloperId,
        },
      });
  } else if (user.roleId == 2) {
    const payment = await prisma.payment.create({
      data: {
        name: '',
        service: '',
        noVirtualAccount: '',
      },
    });

    const dataOrganization = {
      userId: user.userId,
      paymentId: payment.paymentId,
    };

    await prisma.organization.create({
      data: dataOrganization,
    });
  } else if (user.roleId == 3) {
    await prisma.admin.create({
      data: {
        userId: user.userId,
      },
    });
  }

  return user;
}

async function getDetailUserService(nickname) {
  const users = await prisma.user.findUnique({
    where: {
      nickname: nickname,
    },
    include: {
      softwareDevelopers: {
        include: {
          badge: true,
          skills: { include: { skill: true } },
          teams: {
            include: {
              team: {
                include: {
                  competitions: {
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
      }, // Find all data in table.
      organizations: {
        include: { payment: true, competitions: true },
      },
      admins: true,
      role: true,
    },
  });
  return users;
}

async function updateUserService(userId, data) {
  const dataUser = {
    name: data.name,
    nickname: data.nickname,
    email: data.email,
    roleId: data.roleId,
  };

  if (data.avatar) {
    dataUser.avatar = data.avatar;
  }

  const users = await prisma.user.update({
    where: {
      userId: userId,
    },
    data: dataUser,
  });

  if (data.roleId === 1) {
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

    // Tambahkan skillId baru
  } else if (data.roleId === 2) {
    const dataOrganization = {
      description: data.description,
      address: data.address,
      organizationLink: data.organizationLink,
      document: data.document,
    };

    await prisma.organization.upsert({
      where: {
        userId: userId,
      },
      update: dataOrganization,
      create: {
        userId: userId,
        ...dataOrganization,
      },
    });
  } else if (data.roleId === 3) {
    const dataAdmin = {
      userId: userId,
    };
    await prisma.admin.upsert({
      where: {
        userId: userId,
      },
      update: dataAdmin,
      create: {
        ...dataAdmin,
      },
    });
  }

  return users;
}

async function deleteUserService(userId) {
  const user = await prisma.user.findUnique({
    where: {
      userId: userId,
    },
    select: {
      roleId: true,
    },
  });

  if (user.roleId === 1) {
    const softwareDeveloper = await prisma.softwareDeveloper.findUnique({
      where: {
        userId: userId,
      },
    });

    if (softwareDeveloper) {
      await prisma.softwareDeveloper.update({
        where: {
          userId: userId,
        },
        data: {
          skills: {
            deleteMany: {},
          },
          teams: {
            deleteMany: {},
          },
          leaderboards: {
            deleteMany: {},
          },
        },
      });

      await prisma.softwareDeveloper.delete({
        where: {
          userId: userId,
        },
      });
    }
  } else if (user.roleId === 2) {
    const organization = await prisma.organization.findUnique({
      where: {
        userId: userId,
      },
      select: {
        organizationId: true,
        paymentId: true,
      },
    });

    if (organization) {
      const competitions = await prisma.competition.findMany({
        where: {
          organizationId: Number(organization.organizationId),
        },
        select: {
          competitionId: true,
        },
      });

      if (competitions) {
        await Promise.all(
          competitions.map(async competition => {
            await prisma.competition.update({
              where: {
                competitionId: competition.competitionId,
              },
              data: {
                teams: {
                  deleteMany: {},
                },
              },
            });
          }),
        );

        await prisma.competition.deleteMany({
          where: {
            organizationId: Number(organization.organizationId),
          },
        });
      }

      if (organization.paymentId) {
        await prisma.payment.delete({
          where: {
            paymentId: organization.paymentId,
          },
        });
      }

      await prisma.organization.delete({
        where: {
          userId: userId,
        },
      });
    }
  } else if (user.roleId === 3) {
    const admin = await prisma.admin.findUnique({
      where: {
        userId: userId,
      },
    });

    if (admin) {
      await prisma.admin.delete({
        where: {
          userId: userId,
        },
      });
    }
  }

  await prisma.user.delete({
    where: {
      userId: userId,
    },
  });
}

async function getCollaborationIdService(userId) {
  const user = await prisma.user.findUnique({
    where: {
      userId: userId,
    },
    include: {
      softwareDevelopers: {
        select: {
          collaborationId: true,
        },
      },
    },
  });
  return user;
}

async function getUserSelectPasswordService(userId) {
  const user = await prisma.user.findUnique({
    where: {
      userId: userId,
    },
    select: {
      password: true,
    },
  });
  return user;
}

async function changePasswordService(userId, data) {
  const hashPassword = await bcrypt.hash(data.newPassword, 10);
  const user = await prisma.user.update({
    where: {
      userId: userId,
    },
    data: {
      password: hashPassword,
    },
  });
  return user;
}

export {
  getUserService,
  createUserService,
  updateUserService,
  getDetailUserService,
  deleteUserService,
  getCollaborationIdService,
  changePasswordService,
  getUserSelectPasswordService,
};
