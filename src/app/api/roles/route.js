import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();
export async function GET() {
  try {
    const data = await prisma.role.findMany();
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
