import prisma from '@/lib/prisma';
import bcrypt from 'bcrypt';

async function registerSoftwareDeveloperService(data) {
  const hashPassword = await bcrypt.hash(data.password, 10);
  const dataUser = {
    name: data.name,
    email: data.email,
    nickname: data.nickname.toLowerCase(),
    password: hashPassword,
    avatar: 'default-avatar.png',
  };

  const user = await prisma.user.create({
    data: {
      roleId: 1,
      ...dataUser,
    },
  });

  if (user) {
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
  }

  return user;
}

async function registerOrganizationService(data) {
  const hashPassword = await bcrypt.hash(data.password, 10);
  const dataUser = {
    name: data.name,
    nickname: data.nickname.toLowerCase(),
    email: data.email,
    password: hashPassword,
    avatar: 'default-avatar.png',
  };

  const user = await prisma.user.create({
    data: {
      roleId: 2,
      ...dataUser,
    },
  });

  if (user) {
    const payment = await prisma.payment.create({
      data: {
        name: '',
        service: '',
        noVirtualAccount: '',
      },
    });

    await prisma.organization.create({
      data: {
        userId: user.userId,
        paymentId: payment.paymentId,
        document: data.document,
      },
    });
  }

  return user;
}

async function checkAvailableEmailService(email) {
  const user = await prisma.user.findUnique({
    where: {
      email: email,
    },
    select: {
      email: true,
    },
  });

  return user;
}

async function updateEmailVerifiedService(email) {
  const user = await prisma.user.update({
    where: {
      email: email,
    },
    data: {
      isEmailVerified: true,
    },
  });

  return user;
}

async function loginService(email) {
  const user = await prisma.user.findUnique({
    where: {
      email: email,
    },
    include: {
      role: true,
    },
  });
  if (!user) {
    throw new Error('Email atau password tidak valid');
  }

  return user;
}

async function checkEmailVerifiedService(email) {
  const user = await prisma.user.findUnique({
    where: {
      email: email,
      isEmailVerified: true,
    },
    select: {
      email: true,
      isEmailVerified: true,
    },
  });

  return user;
}

export {
  registerSoftwareDeveloperService,
  registerOrganizationService,
  checkAvailableEmailService,
  updateEmailVerifiedService,
  loginService,
  checkEmailVerifiedService,
};
