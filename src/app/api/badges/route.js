import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client/edge';
const prisma = new PrismaClient();
export async function GET() {
  const data = await prisma.badge.findMany(); // Find all data in table.
  return NextResponse.json(data);
}
