import { Character } from '@/types/Character';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

const CharCard = ({
  character,
  fetchCharacters,
}: {
  character: Character;
  fetchCharacters: () => void;
}) => {
  const router = useRouter();
  const handleDelete = async () => {
    try {
      const response = await fetch(`/api/characters/${character.id}`, {
        method: 'DELETE',
      });
      const result = await response.json();
      if (result.success) {
        router.refresh();
        fetchCharacters();
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="border-2 border-cyan-700 rounded-lg bg-slate-100 w-[250px] h-[350px] my-4 flex flex-col items-center mx-4">
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
      <button
        onClick={handleDelete}
        className="rounded-lg px-2 my-2 bg-red-400 text-white hover:bg-red-600"
      >
        Delete
      </button>
    </div>
  );
};

export default CharCard;
