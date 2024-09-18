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

export async function PUT(req: NextRequest) {
  try {
    const data = await req.json();

    if (data.id) {
      return NextResponse.json({
        success: false,
        error: 'You cannot update the id',
      });
    }

    const id = parseInt(req.url.split('/spells/')[1]);
    const spell = await prisma.spell.update({
      where: { id },
      data: {
        name: data.name,
        description: data.description,
      },
    });
    return NextResponse.json({ success: true, data: spell });
  } catch (error) {
    return NextResponse.json({ success: false, message: error });
  }
}
