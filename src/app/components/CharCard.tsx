import { Character } from '@/types/Character';
import Image from 'next/image';

const CharCard = ({ character }: { character: Character }) => {
  return (
    <div className="border-2 border-cyan-700 rounded-lg bg-slate-100 w-[250px] h-[350px] my-4 mx-auto flex flex-col items-center">
      <h1 className="py-2 border-b border-cyan-700 font-semibold text-cyan-700 mb-2 w-full text-center">
        {character.name}
      </h1>
      <Image
        src={character.image ? character.image : '/missing.png'}
        alt={character.name}
        style={{
          width: 'auto',
          height: '220px',
        }}
        width={163}
        height={227}
        priority
      />
      <p className="my-2 italic text-cyan-600">{character.gender}</p>
      {character.wizard && (
        <p className="text-purple-800 font-semibold">Wizard</p>
      )}
      {!character.wizard && (
        <p className="text-red-400 font-semibold">Muggle</p>
      )}
    </div>
  );
};

export default CharCard;
