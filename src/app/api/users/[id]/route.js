import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();
export async function GET(request, { params }) {
  try {
    const data = await prisma.user.findUnique({
      where: {
        userId: params.id,
      },
      include: {
        softwareDevelopers: {
          include: {
            badge: true,
            skills: { include: { skill: true } },
            statusCollaboration: true,
          },
        }, // Find all data in table.
        organizations: {
          include: { payment: true, competitions: true },
        },
        admins: true,
        roles: true,
      },
    });

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

export async function PATCH(request, { params }) {
  const body = await request.json();
  try {
    const data = await prisma.user.update({
      where: {
        userId: params.id,
      },
      data: {
        name: body.name,
      },
    });
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

export async function DELETE(request, { params }) {
  try {
    // Temukan pengguna yang akan dihapus
    const user = await GET(params.id);
    if (!user) {
      return NextResponse.json({
        status: 404,
        success: false,
        message: 'Not Found',
      });
    }

    // Hapus entitas software developer yang terkait, jika ada
    if (user.softwareDevelopers) {
      await prisma.softwareDeveloper.delete({
        where: {
          softwareDeveloperId: user.softwareDevelopers.softwareDeveloperId,
        },
      });
    }

    if (user.admins) {
      await prisma.admin.delete({
        where: {
          adminId: user.admins.adminId,
        },
      });
    }

    if (user.organizations) {
      await prisma.organization.delete({
        where: {
          organizationId: user.organizations.organizationId,
        },
      });
    }

    // Hapus pengguna
    await prisma.user.delete({
      where: {
        userId: params.id,
      },
    });

    return NextResponse.json(user, {
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
