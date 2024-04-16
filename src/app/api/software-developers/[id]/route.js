import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client/edge';
const prisma = new PrismaClient();
export async function GET(NextRequest) {
  const data = await prisma.softwareDeveloper.find(); // Find all data in table.
  return NextResponse.json(data);
}
