import prisma from '@/lib/prisma';
async function getOrganizationService() {
  const organizations = await prisma.organization.findMany({
    include: {
      user: true,
      payment: true,
    },
    where: {
      payment: {
        NOT: {
          name: null,
          service: null,
          noVirtualAccount: null,
        },
      },
    },
  }); // Find all data in table.
  return organizations;
}

async function getDetailOrganizationService(userId) {
  const organization = await prisma.user.findUnique({
    where: {
      userId: userId,
    },
    include: {
      organizations: {
        include: {
          payment: true,
        },
      },
    },
  });
  return organization;
}

async function updateOrganizationService(userId, data) {
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

  const dataOrganization = {
    description: data.description,
    address: data.address,
    organizationLink: data.organizationLink,
    isValidDocument: JSON.parse(data.isValidDocument),
  };

  if (data.document) {
    dataOrganization.document = data.document;
  }

  const organization = await prisma.organization.update({
    where: {
      userId: userId,
    },
    data: dataOrganization,
  });

  const dataPayment = {
    name: data.paymentName,
    service: data.service,
    noVirtualAccount: data.noVirtualAccount,
  };
  await prisma.payment.update({
    where: {
      paymentId: organization.paymentId,
    },
    data: dataPayment,
  });

  return users;
}

async function checkOrganizationByUserId(userId) {
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

export {
  getOrganizationService,
  updateOrganizationService,
  checkOrganizationByUserId,
  getDetailOrganizationService,
};
