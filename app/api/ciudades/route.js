import { NextResponse } from 'next/server';
import { db } from '@/app/db';

export async function GET() {
  try {
    const ciudades = await db.ciudad.findMany();
    return NextResponse.json(ciudades);
  } catch (error) {
    console.error('Error fetching ciudades:', error);
    return NextResponse.error();
  }
}
