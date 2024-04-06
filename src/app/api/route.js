import { NextResponse } from '../../../node_modules/next/server';

export async function GET() {
  return NextResponse.json({ status: 200, message: 'Success' });
}
