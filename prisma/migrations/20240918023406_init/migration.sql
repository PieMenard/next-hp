-- CreateTable
CREATE TABLE "Character" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "gender" TEXT NOT NULL,
    "wizard" BOOLEAN NOT NULL,
    "image" TEXT NOT NULL,

    CONSTRAINT "Character_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_CharacterSpells" (
    "A" TEXT NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_CharacterSpells_AB_unique" ON "_CharacterSpells"("A", "B");

-- CreateIndex
CREATE INDEX "_CharacterSpells_B_index" ON "_CharacterSpells"("B");

-- AddForeignKey
ALTER TABLE "_CharacterSpells" ADD CONSTRAINT "_CharacterSpells_A_fkey" FOREIGN KEY ("A") REFERENCES "Character"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_CharacterSpells" ADD CONSTRAINT "_CharacterSpells_B_fkey" FOREIGN KEY ("B") REFERENCES "Spell"("id") ON DELETE CASCADE ON UPDATE CASCADE;
