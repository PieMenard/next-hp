import { PrismaClient } from '@prisma/client';
import { NextResponse } from "next/server";

const prisma = new PrismaClient();

async function seedDatabase() {
    try {
        const response = await fetch('https://hp-api.herokuapp.com/api/characters');
        const characters = await response.json();
        for (const character of characters) {
            await prisma.character.create({
                data: {
                    name: character.name,
                    gender: character.gender || null,
                    wizard: character.wizard
                },
            });
        }
        return NextResponse.json({ success: true, message: 'database seeded successfully' })
    } catch (error) {
        return NextResponse.json({ success: false, error: error })
    }
    finally {
        await prisma.$disconnect();
    }
}

seedDatabase();