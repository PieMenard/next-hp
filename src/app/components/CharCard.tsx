import { Character } from '@/types/Character';

const CharCard = ({ character }: { character: Character }) => {
  return (
    <div className="border-2 border-cyan-700 rounded-lg bg-slate-100 w-[200px] h-[300px] text-center my-4 mx-auto">
      <h1 className="py-2 border-b border-cyan-700 font-semibold text-cyan-700">
        {character.name}
      </h1>
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
