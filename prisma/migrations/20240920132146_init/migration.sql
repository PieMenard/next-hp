/*
  Warnings:

  - The primary key for the `Character` table will be changed. If it partially fails, the table could be left without primary key constraint.

*/
-- DropForeignKey
ALTER TABLE "_CharacterSpells" DROP CONSTRAINT "_CharacterSpells_A_fkey";

-- AlterTable
ALTER TABLE "Character" DROP CONSTRAINT "Character_pkey",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ADD CONSTRAINT "Character_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "Character_id_seq";

-- AlterTable
ALTER TABLE "_CharacterSpells" ALTER COLUMN "A" SET DATA TYPE TEXT;

-- AddForeignKey
ALTER TABLE "_CharacterSpells" ADD CONSTRAINT "_CharacterSpells_A_fkey" FOREIGN KEY ("A") REFERENCES "Character"("id") ON DELETE CASCADE ON UPDATE CASCADE;
