import { prisma } from '@/lib/prisma';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const offset = parseInt(searchParams.get('offset') || '0');
    const limit = parseInt(searchParams.get('limit') || '10');

    const id = searchParams.get('id');
    const name = searchParams.get('name');
    const wizard = searchParams.get('wizard');
    const spell = searchParams.get('spell');

    const filters: any = {};

    if (id) {
      filters.id = parseInt(id);
    }

    if (name) {
      filters.name = { contains: name, mode: 'insensitive' };
    }

    if (wizard) {
      filters.name = { wizard: true };
    }

    if (spell) {
      filters.spells = {
        some: {
          name: {
            contains: spell,
            mode: 'insensitive',
          },
        },
      };
    }

    const data = await prisma.character.findMany({
      where: filters,
      select: { name: true, id: true },
      skip: offset,
      take: limit,
    });

    const results = {
      offset: offset,
      limit: limit,
      results: data,
    };

    return NextResponse.json({ success: true, data: results });
  } catch (error) {
    return NextResponse.json({ success: true, error: error });
  }
}

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
