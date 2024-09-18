import { prisma } from '@/lib/prisma';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  try {
    const data = await req.json();
    const character = await prisma.character.create({
      data: {
        name: data.name,
        gender: data.gender,
        wizard: data.wizard,
        spells: {
          connect: data.spells.map((spellData: any) => ({
            id: spellData.spell.id,
          })),
        },
      },
      include: { spells: true },
    });
    return NextResponse.json({ success: true, data: character });
  } catch (error) {
    return NextResponse.json({ success: false, message: error });
  }
}
