import { prisma } from '@/lib/prisma';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest) {
  try {
    const id = req.url.split('/characters/')[1];
    const character = await prisma.character.findUnique({
      where: { id },
      include: { spells: true },
    });
    return NextResponse.json({ success: true, data: character });
  } catch (error) {
    return NextResponse.json({ success: false, message: error });
  }
}
