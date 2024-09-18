import { prisma } from '@/lib/prisma';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest) {
  try {
    const id = parseInt(req.url.split('/characters/')[1]);
    const character = await prisma.character.findUnique({
      where: { id },
      include: { spells: true },
    });
    return NextResponse.json({ success: true, data: character });
  } catch (error) {
    return NextResponse.json({ success: false, message: error });
  }
}

export async function PUT(req: NextRequest) {
  try {
    const data = await req.json();

    if (data.id) {
      return NextResponse.json({
        success: false,
        error: 'You cannot update the id',
      });
    }

    const id = parseInt(req.url.split('/characters/')[1]);

    const existingCharacter = await prisma.character.findUnique({
      where: { id },
      include: { spells: true },
    });

    if (!existingCharacter) {
      return NextResponse.json({
        success: false,
        error: 'Character not found',
      });
    }

    // Get current and new spell IDs
    const currentSpellIds = existingCharacter.spells.map((spell) => spell.id);
    const newSpellIds = data.spells.map((spellData: any) => spellData.spell.id);

    // Calculate spells to connect and disconnect
    const spellsToConnect = newSpellIds.filter(
      (id: number) => !currentSpellIds.includes(id)
    );
    const spellsToDisconnect = currentSpellIds.filter(
      (id: number) => !newSpellIds.includes(id)
    );

    const character = await prisma.character.update({
      where: { id },
      data: {
        name: data.name,
        gender: data.gender,
        wizard: data.wizard,
        spells: {
          connect: spellsToConnect.map((spellId: any) => ({ id: spellId })),
          disconnect: spellsToDisconnect.map((spellId: any) => ({
            id: spellId,
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
