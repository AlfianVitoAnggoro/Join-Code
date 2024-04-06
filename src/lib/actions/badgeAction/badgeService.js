'use server';
import prisma from '@/lib/prisma';

async function getBadgeService() {
  const badges = await prisma.badge.findMany();
  return badges;
}

async function getDetailBadgeService(badgeId) {
  const badge = await prisma.badge.findUnique({
    where: {
      badgeId: Number(badgeId),
    },
  });

  return badge;
}

async function updateBadgeService(badgeId, data) {
  const badge = await prisma.badge.update({
    where: {
      badgeId: Number(badgeId),
    },
    data: data,
  });
  return badge;
}

async function createBadgeService(data) {
  const badge = await prisma.badge.create({
    data: data,
  });
  return badge;
}

async function deleteBadgeService(badgeId) {
  const badge = await prisma.badge.delete({
    where: {
      badgeId: Number(badgeId),
    },
  });
  return badge;
}

export {
  getBadgeService,
  getDetailBadgeService,
  updateBadgeService,
  createBadgeService,
  deleteBadgeService,
};
