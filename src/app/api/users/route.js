import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();
export async function GET() {
  try {
    const data = await prisma.user.findMany({
      include: {
        roles: true,
      },
    }); // Find all data in table.

    return NextResponse.json(data, {
      status: 200,
      success: true,
      message: 'Success',
    });
  } catch (error) {
    return NextResponse.json(error, {
      status: 500,
      success: false,
      message: 'Failed',
    });
  }
}

export async function POST(request) {
  const body = await request.json();
  try {
    const user = await prisma.user.create({
      data: {
        name: body.name,
        email: body.email,
        password: body.password,
        roleId: body.roleId,
        avatar: 'default-avatar.png',
      },
    });

    // Buat entitas terkait berdasarkan role ID
    if (body.roleId === 1) {
      await prisma.softwareDeveloper.create({
        data: {
          user: { connect: { userId: user.userId } },
          statusCollaboration: { connect: { statusCollaborationId: 1 } },
        },
      });
    } else if (body.roleId === 2) {
      await prisma.organization.create({
        data: {
          user: { connect: { userId: user.userId } },
          document: 'document.pdf',
        },
      });
    } else if (body.roleId === 3) {
      await prisma.admin.create({
        data: {
          user: { connect: { userId: user.userId } },
        },
      });
    }

    // Kirim respons dengan data pengguna yang baru dibuat
    return NextResponse.json(data, {
      status: 200,
      success: true,
      message: 'Success',
    });
  } catch (error) {
    return NextResponse.json(error, {
      status: 500,
      success: false,
      message: 'Failed',
    });
  }
}
