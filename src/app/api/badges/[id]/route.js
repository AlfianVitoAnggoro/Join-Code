import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

export async function DELETE(request, params) {
  const data = await prisma.badge.delete({
    where: {
      id: Number(params.id),
    },
  });
  return NextResponse.json(data, {
    status: 200,
  });
}

export async function PATCH(request, params) {
  const body = await request.json();
  const data = await prisma.badge.update({
    where: {
      id: Number(params.id),
    },
    data: {
      name: body.name,
      image: body.image,
      point: body.point,
    },
  });
  return NextResponse.json(data, {
    status: 200,
  });
}
