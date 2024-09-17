-- CreateTable
CREATE TABLE "Spell" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,

    CONSTRAINT "Spell_pkey" PRIMARY KEY ("id")
);
