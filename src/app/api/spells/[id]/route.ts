import { prisma } from '@/lib/prisma';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest) {
  try {
    const id = parseInt(req.url.split('/spells/')[1]);
    const spell = await prisma.spell.findUnique({
      where: { id },
    });
    return NextResponse.json({ success: true, data: spell });
  } catch (error) {
    return NextResponse.json({ success: false, message: error });
  }
}
