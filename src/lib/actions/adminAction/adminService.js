import prisma from '@/lib/prisma';

async function updateAdminService(userId, data) {
  const dataUser = {
    name: data.name,
    isEmailVerified: JSON.parse(data?.isEmailVerified),
  };

  if (data.email) {
    dataUser.email = data.email;
  }

  if (data.avatar) {
    dataUser.avatar = data.avatar;
  }

  const users = await prisma.user.update({
    where: {
      userId: userId,
    },
    data: dataUser,
  });

  return users;
}

async function checkAdminByUserId(userId) {
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

export { updateAdminService, checkAdminByUserId };
