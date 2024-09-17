import { prisma } from '@/lib/prisma';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  try {
    const data = await req.json();
    const spell = await prisma.spell.create({
      data: {
        name: data.name,
        description: data.description,
        id: data.id,
      },
    });
    return NextResponse.json({ success: true, data: spell });
  } catch (error) {
    return NextResponse.json({ success: false, message: error });
  }
}
