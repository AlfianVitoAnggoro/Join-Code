import prisma from '@/lib/prisma';

async function addVerifyToken(data) {
  const expires = new Date();
  expires.setHours(expires.getHours() + 1);
  const verifyToken = await prisma.verificationToken.create({
    data: {
      ...data,
      expires,
    },
  });
  return verifyToken;
}

async function checkValidToken(data) {
  const validToken = await prisma.verificationToken.findUnique({
    where: {
      identifier_token: {
        identifier: data.email,
        token: data.token,
      },
    },
  });

  if (!validToken) {
    throw new Error('Token tidak valid');
  }
  if (validToken.expires < new Date()) {
    throw new Error('Token expired, klik kirim ulang verifikasi');
  }

  return validToken;
}

async function checkValidTokenExpired(data) {
  const validToken = await prisma.verificationToken.findUnique({
    where: {
      identifier_token: {
        identifier: data.email,
        token: data.token,
      },
    },
  });

  if (!validToken) {
    throw new Error('Token tidak valid');
  }

  if (validToken.expires < new Date()) {
    return validToken;
  }
}

async function deleteToken(data) {
  const validToken = await prisma.verificationToken.delete({
    where: {
      identifier_token: {
        identifier: data.email,
        token: data.token,
      },
    },
  });

  return validToken;
}

export { addVerifyToken, checkValidToken, checkValidTokenExpired, deleteToken };
