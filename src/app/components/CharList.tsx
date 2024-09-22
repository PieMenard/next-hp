import { Character } from '@/types/Character';
import CharCard from './CharCard';

const CharList = ({
  characters,
  fetchCharacters,
}: {
  characters: Character[];
  fetchCharacters: () => void;
}) => {
  return (
    <div>
      <ul className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {characters.map((char) => (
          <li key={char.id}>
            <CharCard character={char} fetchCharacters={fetchCharacters} />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CharList;
